import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export function ActivityFilters () {
  return (
    <>
        <Menu vertical size="large" style={{width: '100%', marginTop: 25}}>
            <Header icon="filter" attached color='teal' content="Filters"/>
            <Menu.Item context="All Activities"/>
            <Menu.Item context="I'm going"/>
            <Menu.Item context="I'm hosting"/>
        </Menu>
        <Header />
        <Calendar />
    </>
  );
}
