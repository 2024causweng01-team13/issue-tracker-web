import { useQuery } from '@tanstack/react-query';
import './App.css';
import { fetcher } from './apis';
import { Router } from './routes/routers';

function App() {
  const { data, isLoading } = useQuery({ queryKey: ['health'], queryFn: () => fetcher.get('/actuator/health')});

  return (
    <>
      <Router />
      <p>
        Issue Tracker Server Status: {data && !isLoading ? JSON.stringify(data.data) : 'Loading...'}
      </p>
    </>
  )
}

export default App
