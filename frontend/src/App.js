import { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss'
import Navigation from './components/Navigation'
import Loader from './components/Loader'

const RoomList = lazy(() => import('./pages/RoomList'))
const Room = lazy(() => import('./pages/Room'))
const Host = lazy(() => import('./pages/Host'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="content-wrapper">
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route path={['/', '/rooms', '/search/:keyword', '/page/:pageNumber']} exact component={RoomList} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/host/:id" component={Host} />
          </Suspense>
        </Switch>
      </main>
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
