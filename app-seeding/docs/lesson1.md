# Lesson 1: Giới thiệu về ứng dụng Seeding

## 1. Giới thiệu các chức năng đang chạy thực tế

https://scigroup.com.vn/cp/app-seeding/

## 2. Cấu trúc ứng dụng Seeding

<img src="https://i.imgur.com/QdHZ9f8.png">

- Folder api chứa các function gọi api
- Folder components chứa các component
- Folder hooks chứa các custom hook
- Folder screens chứa các màn hình được hiển thị

  - Trong folder screens chứa file root.jsx để xử lý router

    <img src="https://i.imgur.com/Ct4h5dM.png">

- Folder services chứa các function xử lý api
- Folder styles chứa các style global
- File index là file tổng

## 3. Giới thiệu package được sử dụng

[react-query](https://tanstack.com/query/latest/docs/react/overview) & [react-query-devtools](<(https://tanstack.com/query/latest/docs/react/overview)>) thư viện dùng để xử lý API. Giúp việc tìm nạp, lưu vào bộ đệm, đồng bộ hóa và cập nhật trạng thái máy chủ trong các ứng dụng web của bạn trở nên dễ dàng.

[react-chartjs-2](https://react-chartjs-2.js.org/) & [chart.js](https://www.chartjs.org/) thư viện biểu đồ

[react-data-table-component](https://react-data-table-component.netlify.app/) & [styled-components v5.3.9](https://react-data-table-component.netlify.app/) thư viện hỗ trợ data table

[axios](https://axios-http.com/vi/docs/intro) là một thư viện HTTP Client dựa trên Promise dành cho node.js và trình duyệt

[react-router-dom](https://reactrouter.com/en/main) thư viện hỗ trợ định tuyến router

[sass](https://www.npmjs.com/package/sass) thư viện compiler scss -> css
