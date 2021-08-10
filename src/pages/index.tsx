import React from 'react';
import { PageProps } from 'gatsby';
import '../styles/TrainingUI.scss';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Container, Main } from '@/components/Layout';

const Home: React.FC<PageProps> = () => (
  <main>
    <Navbar course="Introduction to React" />
    <Main>
      <Container>
        <Sidebar />
      </Container>
    </Main>
  </main>
);

export default Home;
