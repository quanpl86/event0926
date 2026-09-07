export const avatarOptions = [
  { id: "creator-green", label: "Nhà sáng tạo", src: "/assets/avatar-nha-sang-tao.png" },
  { id: "builder", label: "Nhà chế tạo", src: "/assets/avatar-nha-che-tao.png" },
  { id: "explorer", label: "Nhà khám phá", src: "/assets/avatar-nha-kham-pha.png" }
] as const;

export function avatarFor(id: string) {
  return avatarOptions.find(item => item.id === id) ?? avatarOptions[0];
}
