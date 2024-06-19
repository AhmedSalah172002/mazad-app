import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

import dashboard from '../../images/assets/icons/navbar/ic_analytics.svg'
import user from '../../images/assets/icons/navbar/ic_user.svg'
import product from '../../images/assets/icons/navbar/ic_cart.svg'
import blog from '../../images/assets/icons/navbar/ic_blog.svg'





const icon = (name) => (
  <SvgColor src={`../../images/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'لوحة التحكم',
    path: 'overview',
    icon: <SvgColor src={dashboard} sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'المستخدمين',
    path: 'user',
    icon: <SvgColor src={user} sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'المنتجات',
    path: 'products',
    icon: <SvgColor src={product} sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'التعليقات',
    path: 'blog',
    icon: <SvgColor src={blog} sx={{ width: 1, height: 1 }} />,
  },
];

export default navConfig;
