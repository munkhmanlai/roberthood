import view from './home-view'
import intent from './home-intent'
import model from './home-model'
import {Observable, ReplaySubject} from 'rx'

const Home = (sources) => {
  const {state$} = sources
  const actions = intent(sources)
  const token$ = model(sources.HTTP)
  const request$ = actions.map(data => ({
    url: '/auth',
    method: 'POST',
    eager: true,
    type: 'application/x-www-form-urlencoded',
    send: Object.keys(data).map(k => k + '=' + data[k]).join('&')
  }))

  return {
    DOM: view(sources, token$),
    HTTP: request$,
    state$: token$,
  }
}

export default Home
