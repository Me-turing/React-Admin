import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import App from './App.tsx'
import './index.css'

// 开发环境下启动Mock服务
if (process.env.NODE_ENV === 'development') {
  import('./mock/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass', // 对未处理的请求直接放行
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })
  })
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
