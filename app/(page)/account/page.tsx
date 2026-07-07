import { redirect } from "next/navigation";

export default function Page() {
    // Khi người dùng vào thẳng /account, hệ thống sẽ tự động điều hướng sang /account/profile
    redirect("/account/profile");
}
