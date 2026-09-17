"""Future Me V3 — CLI generator. Python 3.10+, standard library only.
Usage: python 11_prompt_generator.py approved_profile.json output_prompt.txt
Input must contain explicit privacy consent; this script never uploads anything.
"""
from __future__ import annotations
import json,sys,re
from pathlib import Path
BASE=Path(__file__).resolve().parent

class ProfileError(ValueError):pass

def require(ok,message):
    if not ok:raise ProfileError(message)

def clean_text(value,maxlen=450):
    require(isinstance(value,str),'Trường văn bản không đúng định dạng.')
    v=value.strip()
    require(len(v)<=maxlen,'Văn bản vượt giới hạn. Hãy xem lại nội dung.')
    return v

def generate(data,content):
    # strict allowlist excludes parent raw observation, direct identifiers, attachments
    consent=data.get('privacyConsent',{})
    require(consent.get('reviewed') is True,'Chưa xem trước dữ liệu được sao chép.')
    require(consent.get('omitIdentifiers') is True,'Cần loại thông tin nhận dạng khỏi dữ liệu xuất.')
    require(consent.get('parentApprovesExternalTransfer') is True,'Phụ huynh chưa đồng ý chuyển nội dung sang công cụ khác.')
    require(data.get('dreamConfirmed') is True and data.get('fourProjectsApproved') is True,'Ý tưởng và bốn dự án chưa được gia đình xác nhận.')
    grade=data.get('grade');require(type(grade)==int and 1<=grade<=9,'Lớp phải là số từ 1 đến 9.')
    level='primary' if grade<=5 else 'secondary'
    require(data.get('educationLevel')==level,'Cấp học không khớp lớp.')
    domain=data.get('technologyDomain');require(domain in ('programming','robotics_iot','multimedia'),'Bộ môn không hợp lệ.')
    branch=content['branches'][level].get(data.get('specialization'))
    require(branch is not None and branch['domain']==domain,'Nhánh sản phẩm không thuộc bộ môn/cấp học đã chọn.')
    dream=data.get('dreamProject',{})
    for key in ('name','audience','purpose'):
        require(clean_text(dream.get(key,''),200)!='',f'Thiếu thông tin dự án: {key}.')
    require(isinstance(dream.get('features'),list) and dream['features'],'Dự án cần có ít nhất một tính năng mong muốn.')
    projects=data.get('approvedProjects')
    require(isinstance(projects,list) and len(projects)==4,'Phải có đúng bốn dự án được xác nhận.')
    safeProjects=[]
    for i,p in enumerate(projects):
        for k in ('name','goal','deliverable','completionCheck'):
            require(clean_text(p.get(k,''),600),f'Thiếu {k} ở dự án {i+1}.')
        tasks=p.get('tasks')
        require(isinstance(tasks,list) and len(tasks)==3 and all(clean_text(x,400) for x in tasks),f'Dự án {i+1} phải có đúng ba việc cụ thể.')
        sios=p.get('sioIds',[])
        valid={s['id'] for s in branch['sioInteractions']}
        require(isinstance(sios,list) and all(ref in valid for ref in sios),f'Mã chỉ báo dự án {i+1} không hợp lệ.')
        safeProjects.append({'id':f'P{i+1}','name':clean_text(p['name'],150),'goal':clean_text(p['goal'],600),
                             'tasks':[clean_text(t,400) for t in tasks],'deliverable':clean_text(p['deliverable'],500),
                             'completionCheck':clean_text(p['completionCheck'],600),'sioIds':sios,
                             'status':'planned'})
    # internal technical evidence is optional and must be explicitly approved to appear in exported profile
    approvedObs=data.get('approvedObservationSummaries',[])
    require(isinstance(approvedObs,list),'Dữ liệu nhận định không hợp lệ.')
    safeObs=[]; valid={s['id'] for s in branch['sioInteractions']}
    for v in approvedObs:
        require(v.get('source') in ('student_self_report','parent_summary_reviewed','short_task_observation','insufficient_evidence'),'Nguồn nhận định không rõ.')
        require(v.get('sioId') in valid or v.get('sioId') is None,'Chỉ báo không thuộc nhánh.')
        safeObs.append({'source':v['source'],'sioId':v.get('sioId'), 'description':clean_text(v['description'],420),
                        'limit':'Nhận định ban đầu trong phạm vi thông tin được ghi nhận, không phải chứng nhận đạt chuẩn.'})
    # No personal identifiers are copied; only explicitly whitelisted fields. Do not copy arbitrary dict subtrees.
    safe={'displayName':clean_text(data.get('displayName',''),24),'grade':grade,'educationLevel':level,
          'technologyDomain':domain,'specialization':branch['specialization'],'specializationLabel':branch['label'],
          'dreamProject':{'name':clean_text(dream['name'],200),'audience':clean_text(dream['audience'],200),
                          'purpose':clean_text(dream['purpose'],600),'features':[clean_text(x,250) for x in dream['features'][:6]],
                          'appearance':clean_text(dream.get('appearance',''),450)},
          'observations':safeObs,
          'futureGoal':clean_text(data.get('futureGoal',dream['purpose']),450),
          'projects':safeProjects,'sourceType':'Hồ sơ do gia đình cung cấp, phải xem lại trước khi xuất bản; chưa là kết quả kiểm định.',
          'standardReferences':[{ 'id':x['id'],'title':x['title'],'summaryVi':x['summaryVi'],'scopeLimit':x['scopeLimit'],'url':x['sourceUrl']} for x in content['standardsRegistry'] if x['id'] in {ref for si in branch['sioInteractions'] for ref in si['standardRefs']}],
          'toolsOnlyAfterAssessment':branch['toolExamplesAfterAssessment'],
          'privacy':{'publicByDefault':False,'noRealPhoto':True,'parentReviewRequiredBeforeSharing':True}}
    require(safe['displayName'],'Thiếu bí danh học sinh.')
    # neutralize obvious identifying content in whitelisted natural language fields without claiming perfect PII detection
    serialized=json.dumps(safe,ensure_ascii=False)
    indicators=[r'\b[\w.+-]+@[\w-]+\.[\w.-]+\b',r'(?:\+?84|0)[ .-]?(?:\d[ .-]?){9,10}']
    require(not any(re.search(p,serialized) for p in indicators),'Phát hiện dấu hiệu email/số điện thoại: cần rà soát và loại bỏ.')
    hours=data.get('hoursPerWeek'); total=data.get('approvedEstimatedHours')
    if hours is not None and total is not None:
        require(isinstance(hours,(int,float)) and hours>0 and isinstance(total,(int,float)) and total>0,'Giờ học không hợp lệ.')
        safe['schedule']={'hoursPerWeek':hours,'approvedEstimatedHours':total,'estimatedWeeks':int(__import__('math').ceil(total/hours)),
                          'notice':'Ước tính theo giờ gia đình xác nhận, có thể thay đổi theo tiến độ thực tế.'}
    else:
        safe['schedule']={'status':'Chưa chốt lịch','notice':'Gia đình/người hướng dẫn cần xác nhận số giờ và lịch bắt đầu.'}
    intro=('Học sinh Tiểu học: giao diện flat, hình lớn, chữ ngắn, nhân vật chibi hoạt hình điện ảnh, Lucide icons, sticker minh họa riêng, ít menu, bản đồ bốn chặng. Dùng lời nói “con”, “mình”, “ba mẹ”.' if level=='primary' else
           'Học sinh THCS: giao diện hiện đại, dễ đọc, dùng thẻ dự án và dòng thời gian; nêu các nhiệm vụ, tiêu chí, hạn chế rõ nhưng không nói như bản báo cáo máy. Dùng “bạn”.')
    instructions='''Bạn là nhà phát triển React/TypeScript và người viết nội dung giáo dục. Tạo website chạy được từ hồ sơ JSON ở cuối. Hiển thị hoàn toàn bằng tiếng Việt tự nhiên; mô tả bối cảnh trước khi giao nhiệm vụ. Không lộ mã ULO/SIO, chữ “assessment”, “rubric”, “milestone” ở màn dành cho trẻ; mã chuyên môn chỉ nằm trong bảng “Xem cơ sở tham chiếu” cho phụ huynh với nguồn thật, ghi rõ mã nội bộ hoặc khung ngoài. Không gán điểm nghề nghiệp hoặc giả rằng học sinh đã đạt chuẩn.
Website có trang giới thiệu hướng con chọn, điều con thể hiện/chưa rõ, ước mơ, đúng 4 dự án đã xác nhận (đủ 3 nhiệm vụ, sản phẩm, tiêu chí), kế hoạch và mục tiến độ. Phân biệt “đã đánh dấu làm” và “đã có minh chứng được người hướng dẫn xác nhận”. Trạng thái: chưa bắt đầu, đang làm, đã gửi sản phẩm, đã có người hướng dẫn xác nhận; không tự động xác nhận. Cho lưu ghi chú và liên kết minh chứng hợp lệ, riêng tư mặc định. Không hiển thị ảnh dự án minh họa như sản phẩm đã làm.
Lưu tiến độ trong localStorage có phiên bản, giải thích dữ liệu chỉ trên thiết bị, hỗ trợ xuất và nhập JSON có kiểm tra, xác nhận trước khi xóa. Nếu chưa có giờ học, hiển thị “Chưa chốt lịch”, không dựng timeline giả. Gia đình chọn ngày bắt đầu. Các công cụ trong danh mục là gợi ý lựa chọn khi làm dự án, KHÔNG là căn cứ chấm kiến thức hoặc năng lực.
Không thêm tên thật, trường, ngày sinh, ảnh thật, địa chỉ, điện thoại hoặc lời kể riêng tư. Không công khai website mặc định. Nếu thiếu ảnh, dùng minh họa SVG có chú thích; không dùng URL giả hoặc hình người thật. Luôn có nút hoạt động, kiểm tra bàn phím/điện thoại và trạng thái lỗi. Nếu không thể chạy thử ứng dụng, báo rõ chưa kiểm thử thay vì nhận đã hoàn tất.
'''
    prompt='TẠO WEBSITE FUTURE ME TỪ HỒ SƠ ĐÃ DUYỆT\n'+intro+'\n\n'+instructions+'\nHỒ SƠ CHỈ GỒM THÔNG TIN ĐƯỢC PHÉP XUẤT:\n'+json.dumps(safe,ensure_ascii=False,indent=2)+'\n'
    return prompt,safe

def main(argv):
    require(len(argv)==3,'Dùng: python 11_prompt_generator.py approved_profile.json output_prompt.txt')
    inp=Path(argv[1]);out=Path(argv[2]);data=json.loads(inp.read_text(encoding='utf-8'))
    content=json.loads((BASE/'01_noi_dung_webapp_hoan_chinh.json').read_text(encoding='utf-8'))
    prompt,safe=generate(data,content)
    out.write_text(prompt,encoding='utf-8')
    print('PROMPT_CREATED',out,'CHARACTERS',len(prompt),'GRADE',safe['grade'],'BRANCH',safe['specialization'])
if __name__=='__main__':
    try:main(sys.argv)
    except (ProfileError,KeyError,TypeError,json.JSONDecodeError) as exc:
        print('PROMPT_BLOCKED',exc,file=sys.stderr);sys.exit(2)
