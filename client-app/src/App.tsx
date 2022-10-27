import React from 'react';
import './App.css';
//for featching data, like a Promices
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
        {activities.map((act : any) => (
            <List.Item key={act.id}>
              {act.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
