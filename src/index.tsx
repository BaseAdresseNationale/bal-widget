import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import BALWidget from './BALWidget'
import reportWebVitals from './reportWebVitals'
import '@gouvfr/dsfr/dist/dsfr.min.css'
import '@gouvfr/dsfr/dist/utility/utility.min.css'
import GlobalStyle from './globalStyle'
import { ConfigProvider } from './contexts/configContext'
import { RouterHistoryProvider } from './contexts/routerhistoryContext'

const body = document.getElementsByTagName('body')[0]
const balWidgetRootElement = document.createElement('div')
balWidgetRootElement.setAttribute('id', 'bal-widget')
body.appendChild(balWidgetRootElement)
const root = ReactDOM.createRoot(balWidgetRootElement)
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <GlobalStyle />
      <MemoryRouter>
        <RouterHistoryProvider>
          <Routes>
            <Route path='/*' element={<BALWidget />} />
          </Routes>
        </RouterHistoryProvider>
      </MemoryRouter>
    </ConfigProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
