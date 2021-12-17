import {
  Routes,
  Route
} from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import Transactions from './pages/Transactions.jsx'
import TransactionDetail from './pages/TransactionDetail.jsx'
import Payment from './pages/Payment.jsx'

function App() {
  return (
    <div className="bp3-dark" style={{padding: '10px'}}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/transaction/:id" element={<TransactionDetail/>} />
        <Route path="/payment/:status" element={<Payment/>} />
      </Routes>
    </div>
  )
}

export default App
