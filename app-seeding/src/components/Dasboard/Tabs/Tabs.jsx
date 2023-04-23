import React from 'react';
import tabsStyles from './Tabs.module.scss';
import { MENU } from '../../../utils/MENU';
import { NavLink } from 'react-router-dom';

const Tabs = () => {
  return (
    <div className={tabsStyles['tabs_bock']}>
      <ul className="tabs flex">
        {MENU.map((item, index) => (
          <li key={index} className={`${tabsStyles['tab-link']}`}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
