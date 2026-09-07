import type { AgeTier, FutureProject, Option } from "@/types/journey";
import { figurineLook } from "./figurine";

type StepPatch = { title?: string; description?: string; buddy?: string; options?: Option[] };
type OptionPatch = { title?: string; description?: string };

export const stepOverlays: Partial<Record<AgeTier, Record<string, StepPatch>>> = {
  g12: {
    identity: {
      title: "Kitten Bot nên gọi {you} là gì?",
      description: "Cho mình biết tên {you} muốn dùng và lớp đang học nha.",
      buddy: "Xin chào, mình là Kitten Bot! Cho mình tên và lớp để đi cùng {you} cho đúng."
    },
    interest: {
      title: "Nếu được làm một món mới, {you} muốn làm gì?",
      description: "Chọn 1–2 thứ {you} thấy vui. Không có đáp án đúng sai đâu.",
      buddy: "Nhiều thứ hay lắm. {You} chọn thứ làm mình thấy thích nha."
    },
    strength: {
      title: "Khi {you} làm một món mới, {you} hay làm thế nào?",
      description: "Đây là cách {you} thường làm. Chọn 2 điều đúng với mình nha.",
      buddy: "Không có sai đâu. Cứ chọn cách {you} hay làm khi khám phá."
    },
    "creation-style": {
      title: "Khi vừa có ý tưởng, {you} hay làm gì trước?",
      description: "Cách nào cũng hay. {You} chọn cách của mình.",
      buddy: "Có bạn vẽ trước, có bạn làm thử ngay. {You} thì sao?"
    },
    project: {
      title: "Đặt tên cho dự án của {you}",
      description: "Gom những gì {you} vừa chọn, rồi đặt một cái tên vui, dễ nhớ.",
      buddy: "Mình thấy ý tưởng hay rồi. {You} đặt tên cho nó nhé!"
    },
    handoff: {
      title: "Tới lượt ba mẹ cùng kể về {child}",
      description: "Mời {child} kể món vừa nghĩ ra. Ba mẹ kể điều hay thấy ở {child}.",
      buddy: "{Child} đã làm giỏi lắm! Giờ mời ba mẹ kể thêm nha."
    },
    parent: {
      title: "Ba mẹ thường thấy {child} như thế nào ở nhà?",
      description: "Chọn tối đa 3 điều hay thấy. Không cần biết công nghệ.",
      buddy: "Ba mẹ không cần rành máy móc. Cứ kể điều mình thấy ở {child}."
    },
    "parent-support": {
      title: "Ba mẹ muốn đồng hành với {child} thế nào?",
      description: "Chọn tối đa 2 cách vừa với gia đình lúc này.",
      buddy: "Một câu hỏi đúng lúc, hoặc một lần cùng {child} làm thử, cũng đã rất quý."
    },
    "family-mirror": {
      title: "Cả nhà cùng hoàn thiện chân dung của {child}",
      description: "Ba mẹ kể một khoảnh khắc thật về {child}. Rồi cả nhà chọn việc nhỏ làm cùng.",
      buddy: "Một câu chuyện thật sẽ giúp chân dung của {child} đúng hơn."
    },
    profile: {
      title: "Đây là chân dung nhà sáng tạo mà Kitten Bot thấy ở {you}",
      description: "Cả nhà đọc lại. {You} chọn nét đúng với mình, ba mẹ nói chân dung có giống con không nha.",
      buddy: "Tada! Đây là {you}. {You} chọn nét đúng, ba mẹ nói có giống con không nha."
    },
    pathway: {
      title: "Từ chân dung này, {you} có thể thử những gì?",
      description: "Kitten Bot gợi ý vài món gần với {you}. Cả nhà xem, nhớ món thích, rồi làm website nha.",
      buddy: "Không cần làm hết đâu. Cả nhà chọn một món {you} thấy vui nhất nha."
    },
    showcase: {
      title: "Tạo website Future Me của {you}",
      description: "Sao chép lời gợi ý, rồi dán vào Google AI Studio để làm website của {you}.",
      buddy: "Hôm nay xong một chặng, nhưng câu chuyện của {you} mới bắt đầu!"
    }
  },
  g89: {
    identity: {
      title: "Kitten Bot nên gọi {you} là gì?",
      description: "Cho mình tên {you} muốn dùng trên hồ sơ và nhóm lớp đang học.",
      buddy: "Mình là Kitten Bot. {You} muốn xuất hiện trên website với tên nào?"
    },
    interest: {
      title: "Nếu được làm một sản phẩm mới, {you} muốn làm gì?",
      description: "Chọn những hướng {you} đang tò mò hoặc muốn thử. Có thể chọn nhiều.",
      buddy: "Cứ theo hứng thú lúc này. Sau này {you} vẫn đổi được."
    },
    strength: {
      title: "Khi {you} bắt tay vào một ý tưởng mới, {you} thường làm theo cách nào?",
      description: "Chọn 2–3 điều giống cách {you} hay làm khi khám phá hoặc tạo ra thứ mới.",
      buddy: "Không phải để gắn nhãn. Cứ chọn cách {you} thường làm lúc này."
    },
    "creation-style": {
      title: "Khi vừa có ý tưởng, {you} thường bắt đầu thế nào?",
      description: "Chọn cách gần với {you} nhất — vẽ, làm thử, tìm hiểu hay trao đổi.",
      buddy: "Vẽ trước, làm thử, tìm hiểu hay hỏi người khác — đều ổn."
    },
    project: {
      title: "Đặt tên cho dự án của {you}",
      description: "Gom những gì {you} vừa chọn thành một ý tưởng, với tên ngắn để người khác hiểu {you} muốn làm gì.",
      buddy: "Ý tưởng đã có hướng. Đặt tên như một sản phẩm thật nha."
    },
    handoff: {
      title: "Tới lượt ba mẹ cùng kể về {child}",
      description: "Mời {child} chia sẻ dự án vừa nghĩ. Ba mẹ hãy kể những điều thường thấy ở {child} hàng ngày.",
      buddy: "{Child} đã làm rất tốt. Giờ mời ba mẹ kể thêm để bức chân dung được đủ hơn."
    },
    parent: {
      title: "Trong đời thường, ba mẹ thường thấy {child} như thế nào?",
      description: "Chọn tối đa 3 điều hay bắt gặp. Không cần rành công nghệ.",
      buddy: "Ba mẹ không cần rành máy móc — cứ kể điều mình thấy ở {child}."
    },
    "parent-support": {
      title: "Ba mẹ muốn đồng hành với {child} theo cách nào?",
      description: "Chọn tối đa 2 cách vừa với gia đình lúc này.",
      buddy: "Lắng nghe và cho {child} khoảng tự làm thử thường rất quý."
    },
    "family-mirror": {
      title: "Cả nhà cùng hoàn thiện chân dung của {child}",
      description: "Ba mẹ kể một khoảnh khắc thật về {child}. Rồi cả nhà chọn việc muốn thử sau hôm nay.",
      buddy: "Một câu chuyện thật sẽ làm hồ sơ của {child} sống hơn nhiều."
    },
    profile: {
      title: "Đây là chân dung nhà sáng tạo mà Kitten Bot thấy ở {you}",
      description: "Xem lại. {You} chọn những nét đúng với mình, ba mẹ nói chân dung có giống con không, rồi chỉnh nhân vật.",
      buddy: "Đây mới là bản nháp. {You} chọn nét đúng, ba mẹ nói chân dung có giống con không."
    },
    pathway: {
      title: "Từ chân dung này, {you} có thể thử những gì?",
      description: "Đây là vài dự án gần với chân dung vừa dựng. Cả nhà xem, nhớ một ý thích, rồi sang bước làm website.",
      buddy: "Đây là gợi ý, không phải lộ trình phải theo. Cả nhà chọn ý {you} muốn thử trước."
    },
    showcase: {
      title: "Tạo website Future Me của {you}",
      description: "Sao chép lời gợi ý bên dưới, rồi dán vào Google AI Studio để làm website của {you}.",
      buddy: "Website của {you} nên trông như trang cá nhân, không phải trang trẻ con."
    }
  }
};

export const optionOverlays: Partial<Record<AgeTier, Record<string, OptionPatch>>> = {
  g12: {
    game: { title: "Game", description: "Làm game để chơi" },
    robot: { title: "Robot", description: "Làm robot biết cử động" },
    design: { title: "Vẽ & kể chuyện", description: "Vẽ hình và kể chuyện" },
    "digital-world": { title: "Thế giới máy tính", description: "Tạo một thế giới trên máy tính" },
    creative: { title: "Sáng tạo", description: "Nghĩ ra món mới" },
    experiment: { title: "Thử", description: "Làm thử, chưa được thì làm lại" },
    solve: { title: "Tìm cách", description: "Gặp khó thì tìm cách khác" },
    team: { title: "Bạn bè", description: "Làm cùng người khác" },
    sketch: { title: "Vẽ ra", description: "Vẽ ý tưởng trước" },
    make: { title: "Làm ngay", description: "Cầm và làm thử" },
    research: { title: "Xem mẫu", description: "Xem người khác làm gì" },
    talk: { title: "Kể bạn nghe", description: "Nói ra cho rõ ý" },
    inspect: { title: "Xem từng phần", description: "Kiểm tra dây, pin, bánh xe" },
    retry: { title: "Thử cách khác", description: "Đổi một chút rồi làm lại" },
    ask: { title: "Hỏi bạn", description: "Cùng tìm xem sao" },
    guide: { title: "Xem hướng dẫn", description: "Nhờ gợi ý từ người lớn" },
    family: { title: "Gia đình", description: "Giúp việc nhà dễ hơn" },
    school: { title: "Lớp học", description: "Học và chơi vui hơn" },
    earth: { title: "Trái đất", description: "Giữ cây, giữ nhà sạch" },
    community: { title: "Mọi người", description: "Để mọi người vui hơn" },
    "try-project": { title: "Làm một món nhỏ", description: "Cùng bắt đầu trong tuần này" },
    "visit-class": { title: "Thử một buổi học vui", description: "Xem {child} thích gì" },
    "talk-weekly": { title: "Giờ kể chuyện mỗi tuần", description: "Nghe {child} kể điều đã thử" }
  },
  g89: {
    game: { title: "Game", description: "Thiết kế thế giới, nhân vật và luật chơi" },
    robot: { title: "Robot & phần cứng", description: "Chế tạo máy móc và hệ thống thông minh" },
    design: { title: "Thiết kế", description: "Tạo hình ảnh, nhân vật và câu chuyện số" },
    "digital-world": { title: "Sản phẩm số", description: "Xây trải nghiệm số và kết nối người dùng" },
    creative: { title: "Sáng tạo", description: "Đưa ra ý tưởng mới" },
    experiment: { title: "Thích thử", description: "Làm thử, chỉnh rồi làm lại" },
    solve: { title: "Giải quyết vấn đề", description: "Phân tích rồi tìm cách" },
    team: { title: "Làm nhóm", description: "Hoàn thành cùng người khác" },
    sketch: { title: "Phác thảo", description: "Hình dung ý tưởng trước khi làm" },
    make: { title: "Làm thử ngay", description: "Học bằng cách làm thử" },
    research: { title: "Tìm hiểu", description: "Xem người khác đã giải thế nào" },
    talk: { title: "Trao đổi", description: "Nói để làm rõ ý tưởng" },
    inspect: { title: "Xem từng phần", description: "Tìm chỗ đang lỗi" },
    retry: { title: "Đổi cách tiếp cận", description: "Thử một hướng khác" },
    ask: { title: "Hỏi người đi cùng", description: "Cùng tìm ra chỗ đang kẹt" },
    guide: { title: "Tìm tài liệu", description: "Học từ người đi trước" },
    "try-project": { title: "Cùng làm một dự án nhỏ", description: "Chọn việc vừa sức và làm trong tuần" },
    "visit-class": { title: "Thử một trải nghiệm thực tế", description: "Quan sát {child} hứng thú phần nào" },
    "talk-weekly": { title: "Có giờ trao đổi mỗi tuần", description: "Nghe {child} chia sẻ điều đã thử và muốn thử tiếp" }
  }
};

optionOverlays.g67 = {
  game: { title: "Game", description: "Tạo thế giới, nhân vật và luật chơi" },
  robot: { title: "Robot", description: "Lắp máy móc và hệ thống thông minh" },
  design: { title: "Thiết kế", description: "Tạo hình ảnh và câu chuyện số" },
  "digital-world": { title: "Thế giới số", description: "Xây sản phẩm số và kết nối" },
  sketch: { title: "Phác thảo", description: "Nhìn thấy ý tưởng trước" },
  make: { title: "Làm thử ngay", description: "Học bằng cách làm" },
  inspect: { title: "Kiểm tra từng phần", description: "Tìm chỗ đang lỗi" },
  "try-project": { title: "Chọn một dự án nhỏ", description: "Cùng bắt đầu trong tuần này" },
  "talk-weekly": { title: "Có giờ trao đổi mỗi tuần", description: "Nghe {child} chia sẻ điều đã thử và muốn thử tiếp" }
};

const website = (description: string): FutureProject => ({
  id: "portfolio",
  title: "Website Future Me",
  description,
  actions: ["Thiết kế", "Viết nội dung", "Chia sẻ"],
  image: ""
});

const projectSets: Record<AgeTier, Record<string, FutureProject[]>> = {
  g12: {
    robot: [
      { id: "robot-explorer", title: "Robot bạn thân", description: "Lắp robot, nhấn nút và xem nó cử động.", actions: ["Lắp", "Nhấn nút", "Xem chạy"], image: "/assets/activity-robotics.png" },
      { id: "smart-garden", title: "Vườn nhỏ của {you}", description: "Trồng cây, quan sát và chăm từng ngày.", actions: ["Quan sát", "Chăm cây", "Ghi lại"], image: "/assets/activity-nature-observation.png" },
      { id: "adventure-game", title: "Game mê cung vui", description: "Tạo nhân vật và một màn chơi đơn giản.", actions: ["Tạo nhân vật", "Vẽ màn chơi", "Chơi thử"], image: "/assets/activity-world-building.png" },
      website("Một trang để khoe tranh, robot và game {you} đã làm.")
    ],
    game: [
      { id: "adventure-game", title: "Game của riêng {you}", description: "Tạo nhân vật, màn chơi và luật thật dễ.", actions: ["Tạo nhân vật", "Vẽ màn chơi", "Nghĩ luật"], image: "/assets/activity-world-building.png" },
      { id: "3d-world", title: "Ngôi nhà trong máy tính", description: "Xếp nhà, cây và đồ vật trong thế giới số.", actions: ["Xếp nhà", "Tô màu", "Kể chuyện"], image: "/assets/activity-visual-storytelling.png" },
      { id: "robot-explorer", title: "Robot bạn thân", description: "Lắp và giúp robot đi được một đoạn.", actions: ["Lắp", "Điều khiển", "Vui cùng nhau"], image: "/assets/activity-robotics.png" },
      website("Trang nhỏ để {you} khoe game và nhân vật.")
    ],
    design: [
      { id: "visual-story", title: "Truyện tranh của {you}", description: "Vẽ nhân vật rồi kể một câu chuyện ngắn.", actions: ["Vẽ nhân vật", "Kể chuyện", "Tô màu"], image: "/assets/activity-visual-storytelling.png" },
      { id: "3d-world", title: "Thế giới màu sắc", description: "Tạo nhà, cây và nhân vật trong không gian 3D đơn giản.", actions: ["Tạo hình", "Tô màu", "Kể chuyện"], image: "/assets/activity-world-building.png" },
      { id: "interactive-story", title: "Câu chuyện bấm được", description: "Biến tranh vẽ thành câu chuyện mọi người xem được.", actions: ["Vẽ", "Sắp xếp", "Chia sẻ"], image: "/assets/activity-problem-solving.png" },
      website("Trang để treo tranh và câu chuyện của {you}.")
    ],
    "digital-world": [
      { id: "3d-world", title: "Thế giới của {you}", description: "Xếp nhà, đường đi và quy tắc vui trên máy tính.", actions: ["Xếp hình", "Đặt tên", "Mời bạn xem"], image: "/assets/activity-world-building.png" },
      { id: "ai-helper", title: "Bạn nhỏ giúp học", description: "Nghĩ một bạn AI biết hỏi và khen {you}.", actions: ["Đặt câu hỏi", "Vẽ bạn AI", "Thử nói chuyện"], image: "/assets/activity-problem-solving.png" },
      { id: "smart-project", title: "Món đồ biết giúp việc", description: "Nghĩ một món nhỏ giúp ba mẹ hoặc thú cưng.", actions: ["Quan sát", "Nghĩ ý", "Làm thử"], image: "/assets/activity-robotics.png" },
      website("Trang để kể về thế giới {you} vừa tạo.")
    ]
  },
  g35: {
    robot: [
      { id: "robot-explorer", title: "Robot thám hiểm", description: "Lắp ráp, điều khiển và giúp robot vượt thử thách.", actions: ["Lắp ráp", "Điều khiển", "Thử nghiệm"], image: "/assets/activity-robotics.png" },
      { id: "smart-garden", title: "Khu vườn thông minh", description: "Dùng cảm biến đơn giản để chăm cây và quan sát thiên nhiên.", actions: ["Quan sát", "Đo dữ liệu", "Chăm cây"], image: "/assets/activity-nature-observation.png" },
      { id: "adventure-game", title: "Game phiêu lưu", description: "Tạo nhân vật, luật chơi và phản hồi cho người chơi.", actions: ["Tạo nhân vật", "Nghĩ luật", "Lập trình"], image: "/assets/activity-world-building.png" },
      website("Trưng bày dự án và kể câu chuyện sáng tạo của {you}.")
    ],
    game: [
      { id: "adventure-game", title: "Game phiêu lưu của riêng mình", description: "Tạo nhân vật, màn chơi, luật và phản hồi cho người chơi.", actions: ["Tạo nhân vật", "Thiết kế màn chơi", "Nghĩ luật"], image: "/assets/activity-world-building.png" },
      { id: "3d-world", title: "Thế giới 3D", description: "Xây môi trường, công trình và kể chuyện trong không gian số.", actions: ["Xây môi trường", "Thiết kế", "Kể chuyện"], image: "/assets/activity-visual-storytelling.png" },
      { id: "robot-explorer", title: "Robot thám hiểm", description: "Lắp ráp và giúp robot vượt qua thử thách.", actions: ["Lắp ráp", "Điều khiển", "Thử nghiệm"], image: "/assets/activity-robotics.png" },
      website("Trưng bày game và thế giới {you} đã tạo.")
    ],
    design: [
      { id: "visual-story", title: "Câu chuyện bằng hình ảnh", description: "Thiết kế nhân vật, khung truyện và chuyển động đơn giản.", actions: ["Vẽ nhân vật", "Kể chuyện", "Chuyển động"], image: "/assets/activity-visual-storytelling.png" },
      { id: "3d-world", title: "Thế giới 3D", description: "Xây môi trường và kể chuyện trong không gian số.", actions: ["Xây môi trường", "Tạo hình", "Kể chuyện"], image: "/assets/activity-world-building.png" },
      { id: "interactive-story", title: "Câu chuyện tương tác", description: "Biến nhân vật thành trải nghiệm người khác khám phá được.", actions: ["Tạo nhân vật", "Thiết kế", "Thử nghiệm"], image: "/assets/activity-problem-solving.png" },
      website("Trưng bày tranh, nhân vật và câu chuyện của {you}.")
    ],
    "digital-world": [
      { id: "3d-world", title: "Thế giới số của riêng mình", description: "Xây môi trường, công trình và những quy tắc thú vị.", actions: ["Lập kế hoạch", "Xây dựng", "Thử nghiệm"], image: "/assets/activity-world-building.png" },
      { id: "ai-helper", title: "Trợ lý nhỏ học tập", description: "Thiết kế một trợ lý biết hỏi và gợi ý cho {you}.", actions: ["Đặt câu hỏi", "Thiết kế", "Kiểm tra"], image: "/assets/activity-problem-solving.png" },
      { id: "smart-project", title: "Sản phẩm thông minh nhỏ", description: "Kết hợp quan sát, dữ liệu đơn giản và ý tưởng giúp cuộc sống.", actions: ["Quan sát", "Kết nối", "Làm thử"], image: "/assets/activity-robotics.png" },
      website("Trưng bày dự án và kể câu chuyện sáng tạo của {you}.")
    ]
  },
  g67: {
    robot: [
      { id: "robot-explorer", title: "Robot thám hiểm", description: "Lắp ráp, lập trình và thử robot vượt địa hình hoặc nhiệm vụ.", actions: ["Lắp ráp", "Lập trình", "Thử nghiệm"], image: "/assets/activity-robotics.png" },
      { id: "smart-garden", title: "Khu vườn thông minh", description: "Dùng cảm biến để theo dõi cây và tự động hóa một phần chăm sóc.", actions: ["Đo dữ liệu", "Lắp cảm biến", "Tự động hóa"], image: "/assets/activity-nature-observation.png" },
      { id: "adventure-game", title: "Game phiêu lưu", description: "Thiết kế nhân vật, màn chơi và phản hồi cho người chơi.", actions: ["Thiết kế", "Lập trình", "Playtest"], image: "/assets/activity-world-building.png" },
      website("Portfolio đơn giản để {you} trưng bày sản phẩm.")
    ],
    game: [
      { id: "adventure-game", title: "Game phiêu lưu của {you}", description: "Tạo nhân vật, màn chơi, luật và vòng phản hồi cho người chơi.", actions: ["Tạo nhân vật", "Thiết kế màn chơi", "Lập trình"], image: "/assets/activity-world-building.png" },
      { id: "3d-world", title: "Thế giới 3D", description: "Xây môi trường, công trình và kể chuyện trong không gian số.", actions: ["Xây môi trường", "Thiết kế", "Kể chuyện"], image: "/assets/activity-visual-storytelling.png" },
      { id: "robot-explorer", title: "Robot thám hiểm", description: "Lắp ráp và lập trình robot vượt thử thách.", actions: ["Lắp ráp", "Điều khiển", "Thử nghiệm"], image: "/assets/activity-robotics.png" },
      website("Trang giới thiệu game và thế giới {you} đang làm.")
    ],
    design: [
      { id: "visual-story", title: "Câu chuyện bằng hình ảnh", description: "Thiết kế nhân vật, storyboard và chuyển động.", actions: ["Thiết kế nhân vật", "Storyboard", "Animation"], image: "/assets/activity-visual-storytelling.png" },
      { id: "3d-world", title: "Thế giới 3D", description: "Xây môi trường và kể chuyện trong không gian số.", actions: ["Xây môi trường", "Tạo hình", "Kể chuyện"], image: "/assets/activity-world-building.png" },
      { id: "interactive-story", title: "Câu chuyện tương tác", description: "Biến nhân vật thành trải nghiệm người khác khám phá được.", actions: ["Tạo nhân vật", "Thiết kế", "Thử nghiệm"], image: "/assets/activity-problem-solving.png" },
      website("Portfolio thiết kế và câu chuyện của {you}.")
    ],
    "digital-world": [
      { id: "3d-world", title: "Thế giới số của {you}", description: "Xây môi trường, quy tắc và trải nghiệm người dùng.", actions: ["Lập kế hoạch", "Xây dựng", "Thử nghiệm"], image: "/assets/activity-world-building.png" },
      { id: "ai-helper", title: "Trợ lý AI học tập", description: "Thiết kế trợ lý nhỏ biết hướng dẫn và gợi ý.", actions: ["Đặt câu hỏi", "Thiết kế", "Kiểm tra"], image: "/assets/activity-problem-solving.png" },
      { id: "smart-project", title: "Sản phẩm thông minh", description: "Kết hợp dữ liệu, cảm biến và ý tưởng giúp cuộc sống.", actions: ["Quan sát", "Kết nối", "Tự động hóa"], image: "/assets/activity-robotics.png" },
      website("Trang giới thiệu sản phẩm số {you} đang phát triển.")
    ]
  },
  g89: {
    robot: [
      { id: "robot-explorer", title: "Robot thực địa", description: "Thiết kế, lập trình và tinh chỉnh robot cho một nhiệm vụ cụ thể.", actions: ["Thiết kế cơ khí", "Lập trình", "Tinh chỉnh"], image: "/assets/activity-robotics.png" },
      { id: "smart-garden", title: "Hệ thống vườn IoT", description: "Thu dữ liệu cảm biến, hiển thị và tự động hóa chăm sóc.", actions: ["Cảm biến", "Dữ liệu", "Tự động hóa"], image: "/assets/activity-nature-observation.png" },
      { id: "adventure-game", title: "Game có vòng phản hồi", description: "Thiết kế hệ thống chơi, cân bằng và playtest.", actions: ["Game design", "Lập trình", "Playtest"], image: "/assets/activity-world-building.png" },
      website("Portfolio sản phẩm để {you} kể quá trình làm và kết quả.")
    ],
    game: [
      { id: "adventure-game", title: "Game thử nghiệm của {you}", description: "Thiết kế nhân vật, hệ thống chơi và màn chơi có thể thử được.", actions: ["Thiết kế game", "Thiết kế màn", "Lập trình"], image: "/assets/activity-world-building.png" },
      { id: "3d-world", title: "Thế giới 3D tương tác", description: "Xây môi trường, kể chuyện và tạo trải nghiệm người chơi.", actions: ["Worldbuilding", "Thiết kế", "Tương tác"], image: "/assets/activity-visual-storytelling.png" },
      { id: "robot-explorer", title: "Robot trong game / thực tế", description: "Kết hợp logic điều khiển với thử thách cụ thể.", actions: ["Logic", "Điều khiển", "Thử nghiệm"], image: "/assets/activity-robotics.png" },
      website("Trang portfolio game và process của {you}.")
    ],
    design: [
      { id: "visual-story", title: "Visual storytelling", description: "Nhân vật, storyboard và chuyển động cho một câu chuyện ngắn.", actions: ["Character design", "Storyboard", "Motion"], image: "/assets/activity-visual-storytelling.png" },
      { id: "3d-world", title: "Thế giới 3D", description: "Tạo hình môi trường và kể chuyện trong không gian số.", actions: ["Tạo hình", "Lookdev", "Kể chuyện"], image: "/assets/activity-world-building.png" },
      { id: "interactive-story", title: "Trải nghiệm tương tác", description: "Biến câu chuyện thành sản phẩm người khác dùng được.", actions: ["Thiết kế", "Prototype", "Thử với người dùng"], image: "/assets/activity-problem-solving.png" },
      website("Portfolio thiết kế — nhân vật, process và sản phẩm của {you}.")
    ],
    "digital-world": [
      { id: "3d-world", title: "Sản phẩm thế giới số", description: "Xây môi trường, quy tắc và luồng người dùng.", actions: ["Lập kế hoạch", "Xây dựng", "Thử nghiệm"], image: "/assets/activity-world-building.png" },
      { id: "ai-helper", title: "Trợ lý AI học tập", description: "Thiết kế một trợ lý có kịch bản hướng dẫn và kiểm thử.", actions: ["Prompt & kịch bản", "Thiết kế", "Kiểm thử"], image: "/assets/activity-problem-solving.png" },
      { id: "smart-project", title: "Sản phẩm IoT nhỏ", description: "Kết hợp cảm biến, dữ liệu và một bài toán đời thực.", actions: ["Quan sát", "Kết nối", "Tự động hóa"], image: "/assets/activity-robotics.png" },
      website("Portfolio sản phẩm số của {you}, nhấn mạnh process và hướng đi tiếp.")
    ]
  }
};

const archetypes: Record<AgeTier, Record<string, string>> = {
  g12: {
    robot: "Bạn mê lắp robot",
    game: "Bạn thích tạo game",
    design: "Bạn thích vẽ và kể chuyện",
    "digital-world": "Bạn thích xây thế giới"
  },
  g35: {
    robot: "Nhà kiến tạo sáng tạo",
    game: "Nhà thiết kế thế giới",
    design: "Người kể chuyện sáng tạo",
    "digital-world": "Nhà kiến tạo tương lai"
  },
  g67: {
    robot: "Nhà sáng tạo robot",
    game: "Nhà thiết kế game",
    design: "Nhà kể chuyện bằng hình ảnh",
    "digital-world": "Nhà kiến tạo sản phẩm số"
  },
  g89: {
    robot: "Nhà phát triển sản phẩm robot",
    game: "Nhà thiết kế game & trải nghiệm",
    design: "Nhà thiết kế kể chuyện số",
    "digital-world": "Nhà phát triển sản phẩm số"
  }
};

const directions: Record<AgeTier, Record<string, [string, string, string]>> = {
  g12: {
    robot: ["Lắp robot và máy móc vui", "Làm game nhỏ", "Vẽ và kể chuyện"],
    game: ["Làm game nhỏ", "Xây thế giới trên máy tính", "Lắp robot vui"],
    design: ["Vẽ nhân vật và kể chuyện", "Làm game nhỏ", "Xây nhà trong thế giới 3D"],
    "digital-world": ["Xây thế giới trên máy tính", "Làm game nhỏ", "Lắp robot vui"]
  },
  g35: {
    robot: ["Robotics & máy móc thông minh", "Làm game và sản phẩm số", "Thiết kế và xây thế giới"],
    game: ["Làm game và sản phẩm số", "Thiết kế và xây thế giới", "Robotics & máy móc thông minh"],
    design: ["Thiết kế và kể chuyện bằng hình", "Làm sản phẩm tương tác", "Xây thế giới 3D"],
    "digital-world": ["Xây thế giới và sản phẩm số", "Thử trợ lý AI nhỏ", "Robotics & máy móc thông minh"]
  },
  g67: {
    robot: ["Robotics & công nghệ thông minh", "Lập trình sản phẩm số", "Thiết kế và xây thế giới"],
    game: ["Lập trình & thiết kế game", "Xây thế giới 3D", "Robotics & công nghệ thông minh"],
    design: ["Thiết kế & kể chuyện số", "Lập trình sản phẩm tương tác", "Xây dựng thế giới 3D"],
    "digital-world": ["Xây sản phẩm & thế giới số", "Lập trình & ứng dụng AI", "Robotics & công nghệ thông minh"]
  },
  g89: {
    robot: ["Robotics, cảm biến & IoT", "Lập trình sản phẩm hoàn chỉnh", "Thiết kế trải nghiệm người dùng"],
    game: ["Game design & lập trình", "Worldbuilding / 3D", "Phần cứng và hệ thống thông minh"],
    design: ["Thiết kế truyền thông số", "Sản phẩm tương tác", "Thế giới 3D & motion"],
    "digital-world": ["Sản phẩm số & AI ứng dụng", "Lập trình full project", "IoT và hệ thống thông minh"]
  }
};

export type PortraitKit = { styles: string[]; colors: string[]; gear: string[] };

const portraits: Record<AgeTier, Record<string, PortraitKit>> = {
  g12: {
    robot: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi nhà phát minh", "Mô hình sưu tầm mắt kính to"],
      colors: ["Vàng nắng", "Xanh ngọc TEKY", "Hồng đào vui"],
      gear: ["Robot bạn thân", "Hộp bút màu", "Balo khủng long"]
    },
    game: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi nhà làm game", "Mô hình sưu tầm phiêu lưu"],
      colors: ["Xanh ngọc TEKY", "Vàng năng lượng", "Tím kẹo"],
      gear: ["Tay cầm game nhỏ", "Bản đồ kho báu", "Balo ngôi sao"]
    },
    design: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi họa sĩ", "Mô hình sưu tầm kể chuyện"],
      colors: ["Vàng năng lượng", "Hồng đào", "Xanh ngọc TEKY"],
      gear: ["Hộp bút màu", "Sổ vẽ", "Cọ thần kỳ"]
    },
    "digital-world": {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi nhà khám phá", "Mô hình sưu tầm thế giới số"],
      colors: ["Xanh dương bầu trời", "Xanh ngọc TEKY", "Vàng nắng"],
      gear: ["Máy tính bảng vui", "Bản đồ thế giới kẹo", "Bạn AI hình thú"]
    }
  },
  g35: {
    robot: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi kỹ sư nhỏ", "Mô hình sưu tầm STEM"],
      colors: ["Xanh ngọc TEKY", "Xanh dương khám phá", "Vàng năng lượng"],
      gear: ["Robot đồng hành", "Bộ dụng cụ sáng chế", "Kính khám phá"]
    },
    game: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi kiến tạo thế giới", "Mô hình sưu tầm game"],
      colors: ["Xanh ngọc TEKY", "Tím sáng tạo", "Vàng năng lượng"],
      gear: ["Bản đồ thế giới số", "Tay cầm sáng tạo", "Balo nhà kiến tạo"]
    },
    design: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi nghệ sĩ", "Mô hình sưu tầm kể chuyện"],
      colors: ["Vàng năng lượng", "Tím sáng tạo", "Xanh ngọc TEKY"],
      gear: ["Bút vẽ ánh sáng", "Máy tính bảng thiết kế", "Sổ ý tưởng"]
    },
    "digital-world": {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi khám phá tương lai", "Mô hình sưu tầm công nghệ"],
      colors: ["Xanh dương khám phá", "Xanh ngọc TEKY", "Tím sáng tạo"],
      gear: ["Máy tính bảng thiết kế", "Bản đồ thế giới số", "Trợ lý AI nhỏ"]
    }
  },
  g67: {
    robot: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi học sinh làm robot", "Mô hình sưu tầm studio"],
      colors: ["Xanh ngọc TEKY", "Navy khám phá", "Cam năng lượng"],
      gear: ["Kit robot", "Laptop", "Kính bảo hộ"]
    },
    game: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi nhà làm game", "Mô hình sưu tầm studio"],
      colors: ["Xanh ngọc TEKY", "Tím điện", "Vàng mustard"],
      gear: ["Tay cầm + sổ phác thảo", "Laptop", "Tai nghe"]
    },
    design: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi họa sĩ số", "Mô hình sưu tầm studio"],
      colors: ["Vàng mustard", "Tím sáng tạo", "Xanh ngọc TEKY"],
      gear: ["Máy tính bảng vẽ", "Sổ concept", "Bút stylus"]
    },
    "digital-world": {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi sản phẩm số", "Mô hình sưu tầm studio"],
      colors: ["Xanh dương sâu", "Xanh ngọc TEKY", "Tím điện"],
      gear: ["Laptop", "Bản đồ hệ thống", "Trợ lý AI nhỏ"]
    }
  },
  g89: {
    robot: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi maker teen", "Mô hình sưu tầm studio"],
      colors: ["Xanh ngọc TEKY", "Than navy", "Cam kỹ thuật"],
      gear: ["Kit điện tử", "Laptop", "Tai nghe studio"]
    },
    game: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi game creator", "Mô hình sưu tầm studio"],
      colors: ["Xanh ngọc TEKY", "Tím neon dịu", "Vàng mustard"],
      gear: ["Laptop sáng tạo", "Máy tính bảng vẽ", "Tai nghe"]
    },
    design: {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi designer", "Mô hình sưu tầm studio"],
      colors: ["Vàng mustard", "Tím sáng tạo", "Xanh ngọc TEKY"],
      gear: ["Tablet vẽ", "Sổ concept", "Bút stylus"]
    },
    "digital-world": {
      styles: ["Art toy 3D Pixar, vinyl bóng", "Figurine chibi builder số", "Mô hình sưu tầm studio"],
      colors: ["Xanh dương sâu", "Xanh ngọc TEKY", "Bạc công nghệ"],
      gear: ["Laptop", "Board mạch nhỏ", "Trợ lý AI"]
    }
  }
};

const roadmaps: Record<AgeTier, { stage: string; title: string; body: string }[]> = {
  g12: [
    { stage: "Chặng 1", title: "Chơi và thử", body: "Thử một game nhỏ, một robot vui và một bức vẽ kể chuyện." },
    { stage: "Chặng 2", title: "Làm một món", body: "Chọn món {you} thích nhất và làm xong để khoe cả nhà." },
    { stage: "Chặng 3", title: "Khoe và làm tiếp", body: "Kể món mình làm được, rồi chọn món mới muốn thử." }
  ],
  g35: [
    { stage: "Chặng 1", title: "Khám phá", body: "Thử một game nhỏ, một sản phẩm 3D và một hoạt động robot." },
    { stage: "Chặng 2", title: "Tạo sản phẩm", body: "Chọn hướng {you} vẫn yêu thích và hoàn thành 1–2 project." },
    { stage: "Chặng 3", title: "Chia sẻ", body: "Khoe sản phẩm, nhìn lại điều thích, rồi chọn bước tiếp." }
  ],
  g67: [
    { stage: "Chặng 1", title: "Khám phá", body: "Thử một game, một sản phẩm 3D/AI và một hoạt động robot." },
    { stage: "Chặng 2", title: "Tạo sản phẩm", body: "Chọn hướng {you} vẫn muốn theo và hoàn thành 2–3 project." },
    { stage: "Chặng 3", title: "Xây hồ sơ", body: "Gom sản phẩm thành một trang giới thiệu của {you}." }
  ],
  g89: [
    { stage: "Chặng 1", title: "Thử hướng", body: "Test 2–3 trải nghiệm thật: game, robot/IoT hoặc thiết kế số." },
    { stage: "Chặng 2", title: "Làm sản phẩm", body: "Chọn một hướng, làm xong một sản phẩm rồi hỏi người khác thấy thế nào." },
    { stage: "Chặng 3", title: "Portfolio", body: "Tinh chỉnh 2–3 sản phẩm thành hồ sơ {you} có thể chia sẻ." }
  ]
};

const tekPrograms: Record<AgeTier, string[]> = {
  g12: ["Bé làm Game", "Khám phá Robotics", "Digi STEM Art"],
  g35: ["Bé làm Game", "Khám phá Robotics", "Digi STEM Art"],
  g67: ["Siêu nhân lập trình", "Thế giới vạn vật thông minh", "Digi Style Multimedia"],
  g89: ["Siêu nhân lập trình", "Thế giới vạn vật thông minh", "Digi Style Multimedia"]
};

export type CharacterLook = {
  format: string;
  expression: string;
  background: string;
  forbid: string;
  websiteLook: string;
  addressRule: string;
};

const looks: Record<AgeTier, CharacterLook> = {
  g12: {
    ...figurineLook("young child student, about 6–8 years old, class 1–2"),
    expression: "cheerful, curious, big glossy smile, sparkling eyes",
    websiteLook: "Chữ to, câu ngắn, màu tươi, card lớn. Hero dùng ảnh figurine 3D Pixar, không dùng icon 2D. Gọi học sinh là \"bạn\".",
    addressRule: "Toàn bộ copy tiếng Việt xưng hô học sinh là \"bạn\" / \"Bạn\". Không dùng \"con\" hay \"em\" khi nói với học sinh."
  },
  g35: {
    ...figurineLook("elementary student, about 8–11 years old, class 3–5"),
    expression: "confident, curious, warm, ready to explore",
    websiteLook: "Vui, rõ, card lớn, phù hợp tiểu học. Hero dùng ảnh figurine 3D Pixar, không ghép shape 2D. Gọi học sinh là \"bạn\".",
    addressRule: "Toàn bộ copy tiếng Việt xưng hô học sinh là \"bạn\" / \"Bạn\". Không dùng \"con\" hay \"em\" khi nói với học sinh."
  },
  g67: {
    ...figurineLook("lower-secondary student, about 11–13 years old, class 6–7"),
    expression: "curious, confident, friendly, still cute chibi figurine",
    websiteLook: "Gọn, hiện đại. Hero dùng ảnh figurine 3D Pixar collectible, không dùng minh họa 2D. Gọi học sinh là \"bạn\".",
    addressRule: "Toàn bộ copy tiếng Việt xưng hô học sinh là \"bạn\" / \"Bạn\". Không dùng \"con\" hay \"em\" khi nói với học sinh."
  },
  g89: {
    ...figurineLook("teen student creator, about 13–15 years old, class 8–9"),
    expression: "confident, focused, open, energetic, cute chibi collectible (not a baby)",
    websiteLook: "Portfolio teen gọn. Hero vẫn là figurine 3D Pixar art toy, không phải ảnh người thật và không phải shape 2D. Gọi học sinh là \"bạn\".",
    addressRule: "Toàn bộ copy tiếng Việt xưng hô học sinh là \"bạn\" / \"Bạn\". Không dùng \"con\" hay \"em\" khi nói với học sinh."
  }
};

const labelTemplates: Record<string, string> = {
  game: "Tạo game",
  robot: "Chế tạo robot",
  design: "Thiết kế hình ảnh",
  "digital-world": "Xây thế giới số",
  creative: "Có nhiều ý tưởng",
  experiment: "Sẵn sàng thử lại",
  solve: "Thích giải thử thách",
  team: "Thích làm cùng mọi người",
  sketch: "Thích phác thảo",
  make: "Thích tạo sản phẩm",
  research: "Chủ động tìm hiểu",
  talk: "Thích chia sẻ ý tưởng",
  inspect: "Kiểm tra từng phần",
  retry: "Kiên trì thử cách khác",
  ask: "Biết tìm đồng đội",
  guide: "Biết tìm hướng dẫn",
  family: "Giúp gia đình",
  school: "Giúp trường học",
  earth: "Bảo vệ Trái đất",
  community: "Kết nối cộng đồng",
  curious: "Hay đặt câu hỏi",
  persistent: "Khá kiên trì",
  ideas: "Có nhiều ý tưởng",
  share: "Thích chia sẻ",
  encourage: "Lắng nghe và khích lệ",
  together: "Cùng {child} làm thử",
  space: "Cho {child} không gian tự khám phá",
  connect: "Giúp {child} tìm người hướng dẫn",
  "try-project": "Cùng chọn một dự án nhỏ",
  "visit-class": "Cùng tham gia một buổi trải nghiệm",
  "talk-weekly": "Mỗi tuần dành thời gian nghe {child} kể"
};

const labelTemplatesG12: Record<string, string> = {
  game: "Làm game",
  robot: "Làm robot",
  design: "Vẽ và kể chuyện",
  "digital-world": "Xây thế giới trên máy tính",
  creative: "Nghĩ ra món mới",
  experiment: "Sẵn sàng làm lại",
  solve: "Thích tìm cách",
  team: "Thích làm cùng bạn",
  sketch: "Thích vẽ ý tưởng",
  make: "Thích làm ngay",
  research: "Thích xem mẫu",
  talk: "Thích kể cho người khác",
  inspect: "Xem từng phần",
  retry: "Thử cách khác",
  ask: "Biết hỏi bạn",
  guide: "Biết xem hướng dẫn",
  school: "Giúp lớp học",
  community: "Làm mọi người vui",
  together: "Cùng {child} làm thử",
  space: "Cho {child} tự khám phá",
  connect: "Giúp {child} gặp người hướng dẫn",
  "try-project": "Cùng làm một món nhỏ",
  "talk-weekly": "Mỗi tuần nghe {child} kể"
};

export function voiceLabel(id: string, gradeBand: string, fill: (text: string, gradeBand: string) => string) {
  const table = gradeBand === "1-2" ? { ...labelTemplates, ...labelTemplatesG12 } : labelTemplates;
  return fill(table[id] ?? id, gradeBand);
}

export function projectsFor(tier: AgeTier, interest: string, fill: (text: string) => string): FutureProject[] {
  const list = projectSets[tier][interest] ?? projectSets[tier].design;
  return list.map(project => ({
    ...project,
    title: fill(project.title),
    description: fill(project.description),
    image: `/assets/covers/cover-${tier}-${interest}-${project.id}.png`
  }));
}

export function archetypeFor(tier: AgeTier, interest: string) {
  return archetypes[tier][interest] ?? archetypes[tier].design;
}

export function directionsFor(tier: AgeTier, interest: string) {
  return directions[tier][interest] ?? directions[tier].design;
}

export function portraitFor(tier: AgeTier, interest: string) {
  return portraits[tier][interest] ?? portraits[tier].design;
}

export function roadmapFor(tier: AgeTier, fill: (text: string) => string) {
  return roadmaps[tier].map(item => ({ ...item, body: fill(item.body) }));
}

export function tekProgramsFor(tier: AgeTier) {
  return tekPrograms[tier];
}

export function lookFor(tier: AgeTier) {
  return looks[tier];
}

type ScenarioCopy = { title: string; description: string; buddy: string; inspect: string };

const scenarios: Record<string, ScenarioCopy> = {
  robot: {
    title: "Úi, robot của {you} không chạy…",
    description: "{You} sẽ làm gì trước?",
    buddy: "Bình thường mà! Làm robot cũng có lúc đứng hình.",
    inspect: "Xem dây, pin và bánh xe"
  },
  game: {
    title: "Úi, game của {you} chơi không được…",
    description: "{You} sẽ làm gì trước?",
    buddy: "Bình thường mà! Làm game cũng có lúc nhân vật đứng hình.",
    inspect: "Xem nhân vật, nút bấm và luật chơi"
  },
  design: {
    title: "Úi, hình {you} đang làm chưa ra như ý…",
    description: "{You} sẽ làm gì trước?",
    buddy: "Bình thường mà! Vẽ và kể chuyện cũng có lúc bị kẹt.",
    inspect: "Xem lại màu, hình và câu chuyện"
  },
  "digital-world": {
    title: "Úi, thế giới số của {you} chưa chạy…",
    description: "{You} sẽ làm gì trước?",
    buddy: "Bình thường mà! Xây thế giới cũng có lúc lỗi.",
    inspect: "Xem kết nối và những phần đã dựng"
  }
};

const scenarioTweaks: Partial<Record<AgeTier, Partial<Record<string, Partial<ScenarioCopy>>>>> = {
  g12: {
    robot: {
      title: "Robot {you} làm bị đứng rồi…",
      buddy: "Không sao đâu! Làm robot cũng có lúc chưa chạy.",
      inspect: "Xem dây, pin, bánh xe"
    },
    game: {
      title: "Game {you} làm chơi không được…",
      buddy: "Không sao đâu! Làm game cũng có lúc chưa chạy.",
      inspect: "Xem nhân vật và nút bấm"
    },
    design: {
      title: "Tranh {you} vẽ chưa vừa ý…",
      buddy: "Không sao đâu! Vẽ cũng có lúc chưa ưng.",
      inspect: "Xem lại màu và hình"
    },
    "digital-world": {
      title: "Thế giới {you} dựng chưa chạy…",
      buddy: "Không sao đâu! Dựng thế giới cũng có lúc lỗi.",
      inspect: "Xem các phần đã dựng"
    }
  },
  g89: {
    robot: {
      title: "Robot {you} vừa làm chưa chạy như ý…",
      buddy: "Kẹt chỗ này cũng bình thường. {You} thường làm gì tiếp?"
    },
    game: {
      title: "Game {you} vừa làm chơi chưa được…",
      buddy: "Kẹt chỗ này cũng bình thường. {You} thường làm gì tiếp?"
    },
    design: {
      title: "Bản thiết kế {you} vừa làm chưa ổn…",
      buddy: "Kẹt chỗ này cũng bình thường. {You} thường làm gì tiếp?"
    },
    "digital-world": {
      title: "Thế giới số {you} vừa dựng chưa chạy…",
      buddy: "Kẹt chỗ này cũng bình thường. {You} thường làm gì tiếp?"
    }
  }
};

const genericScenario: ScenarioCopy = {
  title: "Úi, thứ {you} vừa làm chưa chạy…",
  description: "{You} sẽ làm gì trước?",
  buddy: "Bình thường mà! Làm gì cũng có lúc trục trặc.",
  inspect: "Xem lại từng phần"
};

export function scenarioFor(interest: string | undefined, tier: AgeTier): ScenarioCopy {
  const key = interest && scenarios[interest] ? interest : "";
  const base = key ? scenarios[key] : genericScenario;
  const tweak = key ? scenarioTweaks[tier]?.[key] : undefined;
  return { ...base, ...tweak };
}

const interestNames: Record<string, string> = {
  game: "game",
  robot: "robot",
  design: "thiết kế",
  "digital-world": "thế giới số"
};

export function impactFor(interests: string[], tier: AgeTier) {
  const names = interests.map(id => interestNames[id]).filter(Boolean);
  const from = names.length === 0
    ? ""
    : names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} và ${names[names.length - 1]}`;
  if (tier === "g12") {
    return {
      title: "Dự án {you} làm ra sẽ giúp ai?",
      description: from
        ? `{You} vừa chọn ${from}. Nếu làm thành một dự án, {you} muốn giúp ai?`
        : "Chọn một người hoặc nơi {you} muốn dự án giúp ích.",
      buddy: "Dự án của {you} sẽ vui hơn nếu giúp được ai đó."
    };
  }
  return {
    title: "Dự án tương lai mà {you} tạo ra sẽ giúp ai?",
    description: from
      ? `Từ ${from} {you} vừa chọn — nếu thành một dự án, {you} muốn giúp ai?`
      : "Chọn một người hoặc một nơi dự án của {you} sẽ giúp ích.",
    buddy: "Dự án của {you} sẽ ý nghĩa hơn khi giúp được ai đó."
  };
}

function joinedInterests(interests: string[]) {
  const names = interests.map(id => interestNames[id]).filter(Boolean);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} và ${names[names.length - 1]}`;
}

export function projectFor(interests: string[], tier: AgeTier) {
  const from = joinedInterests(interests);
  if (tier === "g12") {
    return {
      title: from ? `Đặt tên cho dự án ${from} của {you}` : "Đặt tên cho dự án của {you}",
      description: from
        ? `{You} vừa chọn ${from}. Hãy gom thành một ý tưởng và đặt tên vui, dễ nhớ.`
        : "Gom những gì {you} vừa chọn, rồi đặt một cái tên vui, dễ nhớ.",
      buddy: "Mình thấy ý tưởng hay rồi. {You} đặt tên như một dự án thật nha!"
    };
  }
  return {
    title: from ? `Đặt tên cho dự án ${from} của {you}` : "Đặt tên cho dự án tương lai của {you}",
    description: from
      ? `{You} vừa chọn ${from}. Hãy gom thành một ý tưởng dự án và đặt tên vui, dễ nhớ.`
      : "Gom những gì {you} vừa chọn thành một ý tưởng, rồi đặt tên vui, dễ nhớ.",
    buddy: "Mình thấy ý tưởng đang thành hình rồi. Đặt tên như một dự án thật nha!"
  };
}

export function futureSelfByImpact(impact: string, projectTitle: string, gradeBand: string, fill: (text: string) => string) {
  const lower = projectTitle.toLocaleLowerCase("vi");
  const map: Record<AgeTier, Record<string, string>> = {
    g12: {
      family: `người làm ${lower} để giúp ba mẹ`,
      school: "người làm việc học và chơi ở lớp vui hơn",
      earth: "người biết giữ cây và giữ nhà sạch",
      community: "người làm món đồ giúp mọi người vui"
    },
    g35: {
      family: `người tạo ${lower} để giúp gia đình`,
      school: "người biến việc học và chơi ở trường trở nên thú vị hơn",
      earth: "người dùng công nghệ để chăm sóc và bảo vệ Trái đất",
      community: "người tạo sản phẩm giúp mọi người kết nối và chia sẻ"
    },
    g67: {
      family: `người tạo ${lower} để giúp gia đình`,
      school: "người làm việc học ở trường thú vị và hữu ích hơn",
      earth: "người dùng công nghệ để chăm sóc môi trường",
      community: "người tạo sản phẩm giúp mọi người kết nối"
    },
    g89: {
      family: `người phát triển ${lower} để giải quyết việc nhà`,
      school: "người tạo sản phẩm làm việc học hiệu quả và thú vị hơn",
      earth: "người dùng công nghệ để giải bài toán môi trường",
      community: "người tạo sản phẩm giúp cộng đồng kết nối và chia sẻ"
    }
  };
  const tier = gradeBand === "1-2" ? "g12" : gradeBand === "6-7" ? "g67" : gradeBand === "8-9" ? "g89" : "g35";
  return fill(map[tier][impact] ?? map[tier].community);
}
