import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/layout/Layout/Layout'
import SearchPage from './pages/SearchPage/SearchPage'
import Home from './pages/Home/Home'
import PodcastPage from './pages/PodcastPage/PodcastPage'
import { ThemeProvider } from '@material-ui/core'
import Subscription from "./pages/SubscriptionPage/SubscriptionPage"
import Messages from "./components/layout/Messages"
import theme from "./theme"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import { useTranslation } from 'react-i18next';

const App = () => {
  const [searchItem, setSearchItem] = useState('')
  const lngArr = ['en_US', 'zh_CN']
  const [lng ] = useState(lngArr)
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Messages>
          <Layout searchItem={searchItem} setSearchItem={setSearchItem} changeLanguage={changeLanguage} lng={lng}>
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route exact path={`/home`} component={Home} />
              <Route exact path={`/region/:code`} component={Home} />
              <Route exact path={`/subscription`} component={Subscription} />
              <Route exact path={`/search/:item`} >
                <SearchPage searchItem={searchItem} />
              </Route>
              <Route exact path={`/podcast/:id`} >
                <PodcastPage />
              </Route>
              <Route component={ErrorPage} />
            </Switch>
          </Layout>
        </Messages>
      </Router>
    </ThemeProvider>

  )
}

export default App;
