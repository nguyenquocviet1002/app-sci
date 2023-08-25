# Lesson 2: Review chức năng đăng nhập, đăng xuất đổi mật khẩu

## 1. Giới thiệu các chức năng đang chạy thực tế

### 1.1. Đăng nhập

#### A. Yêu cầu

- Tạo 1 form đăng nhập cho người dùng với 2 trường số điện thoại và mật khẩu

- Khi click vào đăng nhập -> thành công: đi tới trang dashboard >< thất bại (do sai sdt hoặc mật khẩu, để trống, user đã bị vô hiệu hóa): hiển thị thông báo

- Khi chưa đăng nhập thì không được chuyển hướng tới trang khác

- Khi đã đăng nhập rồi thì không thể quay về trang đăng nhập nữa -> bắt buộc phải logout mới đăng nhập được

#### B. Triển khai

- File http để tạo ra một instance mới của axios bằng cấu hình tự đặt.

<img src="https://i.imgur.com/rVVwhSe.png">

- Tạo function call api bằng axios

<img src="https://i.imgur.com/oDrnZ8e.png">

- Khởi tạo biến initial -> gán biến initial vào state

<img src="https://i.imgur.com/m52rSGj.png">

- Function bắt sự kiện người dùng nhập ô input để cập nhật state

<img src="https://i.imgur.com/6fsbjH1.png">

- Xử lý input

<img src="https://i.imgur.com/hSA7txa.png">

- Sử dụng thư viện Tanstack Query để xử lý api

```sh
 Sử dụng hook useQuery để xử lý việc gọi api bằng phương thức get
 Hai tham số cần phải có là queryKey và queryFn
    - queryKey: định nghĩa tên cho api đó
    - queryFn: function call api, là 1 function bất kì có thể trả về promise
 Enabled: false cho phép hoãn api không tự động call
 onSuccess: sau khi hoàn thành các bước call api và trả ra data sẽ thực thi đoạn code trong onSuccess
```

- Dựa vào data trả về để xử lý validate cho website

- Sau khi đăng nhập thành công -> set token vào local storage -> redirect link sang trang dashboard

<img src="https://i.imgur.com/JHPHCIQ.png">

- Function xử lý submit gửi form đăng nhập

<img src="https://i.imgur.com/hlBsrcr.png">

<img src="https://i.imgur.com/wKZOjgl.png">

---

### 1.2. Đăng xuất

#### A. Yêu cầu

- Một nút đăng xuất

- Khi người dùng click vào sẽ xóa token lưu trong local storage

- Chuyển hướng về trang login

#### B. Triển khai

- Function logout: xóa local storage -> redirect sang trang login

<img src="https://i.imgur.com/5tCdw8T.png">

---

### 1.3. Đổi mật khẩu

#### A. Yêu cầu

- 2 ô input nhập mật khẩu mới và xác nhận lại mật khẩu mới

- Nếu để trống hoặc mật khẩu mới và mật khẩu xác nhận không giống nhau thì hiện thông báo

- Thành công -> đổi mật khẩu

#### B. Triển khai

- Gọi token từ local storage ra bằng hook useLocalStorage()

- Khởi tạo biến mặc định initial password

<img src="https://i.imgur.com/Rt5I5Zx.png">

- Xử lý input

<img src="https://i.imgur.com/H3QqUd5.png">

- Validate và call api

<img src="https://i.imgur.com/WCKA3kX.png">
