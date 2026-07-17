import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
    // Lấy token từ NextAuth (kiểm tra xem người dùng đã đăng nhập chưa)
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    // Các route cần bảo vệ
    const isAccountPage = request.nextUrl.pathname.startsWith('/account')

    // Nếu cố tình vào trang account mà chưa đăng nhập -> redirect về trang chủ
    if (isAccountPage && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // (Tùy chọn) Chặn người dùng đã đăng nhập vào trang đăng nhập mặc định của NextAuth
    const isAuthPage = request.nextUrl.pathname.startsWith('/api/auth/signin')
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// Cấu hình Middleware chỉ chạy trên các route này để tối ưu hiệu suất
export const config = {
    matcher: ['/account/:path*', '/api/auth/signin']
}
