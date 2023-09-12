import React from "react";

import { useSiteMetadata, useTagsList } from "@/hooks";

import { Author } from "./Author";
import { Contacts } from "./Contacts";
import { Copyright } from "./Copyright";
import { Menu } from "./Menu";

import * as styles from "./Sidebar.module.scss";
import { Tags } from "../Post/Tags";

type Props = {
  isIndex?: boolean;
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();
  return (
    <div className={styles.sidebar}>
      <div className={styles.inner}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Tags
          tags={tags.map((tag) => tag.fieldValue)}
          tagSlugs={tags.map((tag) => `/tag/${tag.fieldValue.toLowerCase()}`)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
