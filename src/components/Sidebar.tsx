import React, { HTMLProps } from 'react';
import classNames from 'classnames';
import { GatsbyLinkProps, Link } from 'gatsby';
import useSidebar from '@/hooks/UseSidebar';

type ISidebarProps = HTMLProps<HTMLDivElement>;

interface ISidebar extends React.FC<ISidebarProps> {
  ListItem: typeof SidebarListItem;
}

const Sidebar: ISidebar = ({ className, children }) => (
  <div className={classNames(`tu-sidebar`, className)}>
    <h2 className="tu-sidebar__heading">Contents</h2>
    <ul className="tu-sidebar__list">{children}</ul>
  </div>
);

interface ISidebarListItemProps extends GatsbyLinkProps<unknown> {
  active?: boolean;
  section: string;
  subSections: Array<{ title: string; url: string }>;
}

const SidebarListItem: React.FC<ISidebarListItemProps> = ({
  active,
  className,
  children,
  ref: _ref,
  subSections,
  ...rest
}) => {
  const { activeSection } = useSidebar(subSections);
  return (
    <>
      <li
        className={classNames(`tu-sidebar__list-item`, {
          'tu-sidebar__list-item--active': active,
        })}
      >
        <Link
          className={classNames(
            `tu-sidebar__link`,
            { 'tu-sidebar__link--active': active },
            className,
          )}
          {...rest}
        >
          {children}
        </Link>
      </li>
      {active &&
        subSections.length > 0 &&
        subSections.map((item) => (
          <li
            className={classNames(`tu-sidebar__list-subitem`, {
              'tu-sidebar__list-subitem--active': activeSection === item.url,
            })}
          >
            <a
              className="tu-sidebar__sublink"
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(item.url);
                element?.scrollIntoView();
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
    </>
  );
};

SidebarListItem.defaultProps = {
  active: false,
};

Sidebar.ListItem = SidebarListItem;

export default Sidebar;
