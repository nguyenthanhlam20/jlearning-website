const menuData = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Khóa học",
    path: "/courses",
    newTab: false,
  },
  {
    id: 5,
    title: "Hỗ trợ",
    path: "/support",
    newTab: false,
  },
  {
    id: 3,
    title: "Liên hệ",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Tin tức",
    newTab: false,
    submenu: [
      {
        id: 43,
        title: "Kinh nghiệm học tiếng Nhật",
        path: "/blogs",
        newTab: false,
      },
      {
        id: 44,
        title: "Văn hóa Nhật Bản",
        path: "/blogs",
        newTab: false,
      },
      {
        id: 45,
        title: "Tin tức sự kiện",
        path: "/blogs",
        newTab: false,
      },
      
    ],
  },
];
export default menuData;
