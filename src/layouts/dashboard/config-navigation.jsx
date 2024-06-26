import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

import dashboard from "../../images/assets/icons/navbar/ic_analytics.svg";
import user from "../../images/assets/icons/navbar/ic_user.svg";
import products from "../../images/assets/icons/navbar/products.svg";
import blog from "../../images/assets/icons/navbar/ic_blog.svg";
import profile from "../../images/assets/icons/navbar/profile.svg";
import category from "../../images/assets/icons/navbar/category-svgrepo-com.svg";
import payments from "../../images/assets/icons/navbar/payments.svg";
import { Icon } from "@iconify/react/dist/iconify.js";



let auth;
if (localStorage.getItem("user") !== null) {
  auth = JSON.parse(localStorage.getItem("user"));
}

const navConfig =
  auth?.role === "user"
    ? [
      {
        title: "الصفحة الشخصية",
        path: "profile",
        icon: <SvgColor src={profile} sx={{ width: 1, height: 1 }} />,
      },
    ]
    : auth?.role === "merchant"
      ? [
        {
          title: "الصفحة الشخصية",
          path: "profile",
          icon: <SvgColor src={profile} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "المنتجات",
          path: "products",
          icon: <SvgColor src={products} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "التقيمات",
          path: `reviews/${auth?._id}`,
          icon: <Icon style={{ fontSize: '20px' }} icon={'material-symbols:reviews'} />,
        },
      ]
      : [
        {
          title: "لوحة التحكم",
          path: "overview",
          icon: <SvgColor src={dashboard} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "المستخدمين",
          path: "user",
          icon: <SvgColor src={user} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "المنتجات",
          path: "products",
          icon: <SvgColor src={products} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "التعليقات",
          path: "blog",
          icon: <SvgColor src={blog} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "الفئات",
          path: "categories",
          icon: <SvgColor src={category} sx={{ width: 1, height: 1 }} />,
        },
        {
          title: "البائعين",
          path: "merchants",
          icon: <Icon icon={'fa-solid:users'} sx={{ width: 1, height: 1, fontSize: '20px' }} />,
        },
      ];

export default navConfig;
