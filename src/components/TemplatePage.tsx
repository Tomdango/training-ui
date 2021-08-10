import React, { useEffect } from 'react';
import { PageProps } from 'gatsby';
import Navbar from './Navbar';
import { Container, Main } from './Layout';

type IFrontmatterProps = {
  frontmatter: {
    title: string;
    course: string;
    section: string;
  };
};

const TemplatePage: React.FC<PageProps<unknown, IFrontmatterProps>> = ({
  children,
  pageContext,
}) => {
  const { course, section } = pageContext.frontmatter;

  console.log(pageContext);

  useEffect(() => {
    window.document.title = `${section} | ${course}`;
  }, [pageContext.frontmatter]);

  return (
    <>
      <Navbar course={course} />
      <Main>
        <Container>{children}</Container>
      </Main>
    </>
  );
};

export default TemplatePage;
