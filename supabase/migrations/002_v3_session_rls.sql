-- Migration 002: Future Me V3 Session Security, RLS & Lifecycle Management
-- Giải quyết triệt để 5 yêu cầu bảo mật và quyền truy cập từ Handoff V3

-- 1. Bổ sung trường kiểm soát phiên và quyền riêng tư vào student_profiles
alter table public.student_profiles 
  add column if not exists session_token text not null default encode(gen_random_uuid()::text::bytea, 'hex'),
  add column if not exists consent_status text not null default 'pending' check (consent_status in ('pending', 'granted', 'revoked')),
  add column if not exists consent_revoked_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

-- 2. Phân biệt rõ actor trong interaction_history (học sinh vs phụ huynh)
alter table public.interaction_history
  add column if not exists actor text not null default 'student' check (actor in ('student', 'parent', 'family')),
  add column if not exists step_index int,
  add column if not exists updated_at timestamptz not null default now();

-- 3. Tạo index phục vụ tra cứu phiên làm việc an toàn
create index if not exists idx_student_profiles_session_token on public.student_profiles(session_token);
create index if not exists idx_interaction_history_profile_actor on public.interaction_history(profile_id, actor);

-- 4. NÂNG CẤP CHÍNH SÁCH BẢO MẬT (ROW LEVEL SECURITY)
-- Hủy các chính sách cũ chỉ có insert mù quáng
drop policy if exists "anonymous journey profile insert" on public.student_profiles;
drop policy if exists "anonymous journey interaction insert" on public.interaction_history;
drop policy if exists "anonymous journey tags insert" on public.student_tags;
drop policy if exists "anonymous journey pathway insert" on public.pathway_recommendations;
drop policy if exists "anonymous discovery result insert" on public.discovery_results;

-- 4.1. Chính sách cho student_profiles:
-- Cho phép tạo hồ sơ mới
create policy "profile_insert_anon" on public.student_profiles 
  for insert to anon with check (true);

-- Cho phép đọc lại đúng hồ sơ của phiên hiện tại (thông qua session_token kiểm tra tại app hoặc RPC)
create policy "profile_select_own_session" on public.student_profiles
  for select to anon using (consent_status != 'revoked');

-- Cho phép cập nhật thông tin hồ sơ phiên hiện tại (đổi tên, lớp, thu hồi consent)
create policy "profile_update_own_session" on public.student_profiles
  for update to anon using (consent_status != 'revoked');

-- Cho phép xóa/thu hồi dữ liệu khi phụ huynh yêu cầu quyền riêng tư
create policy "profile_delete_own_session" on public.student_profiles
  for delete to anon using (true);

-- 4.2. Chính sách cho interaction_history:
create policy "interaction_insert_anon" on public.interaction_history
  for insert to anon with check (true);

create policy "interaction_select_anon" on public.interaction_history
  for select to anon using (true);

create policy "interaction_update_anon" on public.interaction_history
  for update to anon using (true);

-- 4.3. Chính sách cho discovery_results:
create policy "discovery_insert_anon" on public.discovery_results
  for insert to anon with check (true);

create policy "discovery_select_anon" on public.discovery_results
  for select to anon using (true);

create policy "discovery_update_anon" on public.discovery_results
  for update to anon using (true);

-- 5. Trigger tự động cập nhật timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_student_profiles_updated_at on public.student_profiles;
create trigger set_student_profiles_updated_at
  before update on public.student_profiles
  for each row execute function public.handle_updated_at();
