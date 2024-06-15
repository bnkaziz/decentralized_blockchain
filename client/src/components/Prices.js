import axios from "axios"
import { useEffect, useState } from "react"

export default function Prices() {

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    async function handlePrices() {
      await axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((data) => setPrices(data.data))
      .catch((err) => console.log(err));
    }
    handlePrices();
  }, []);
  const showPrices = prices.map((price ,index) => (
      <tr key={index}>
        {index <= 9 && (price.name === 'Bitcoin' || 'Ethereum' || 'Tether' || 'BNB' || 'Solana' || 'USDC' || 'Lido Staked Ether' || 'XRP' || 'Dogecoin' || 'Toncoin') && <td>{index + 1}</td> }
        {index <= 9 && (price.name === 'Bitcoin' || 'Ethereum' || 'Tether' || 'BNB' || 'Solana' || 'USDC' || 'Lido Staked Ether' || 'XRP' || 'Dogecoin' || 'Toncoin') && <td><div><img src={`${price.image}`} alt="" />{price.name}</div></td>}
        {index <= 9 && (price.name === 'Bitcoin' || 'Ethereum' || 'Tether' || 'BNB' || 'Solana' || 'USDC' || 'Lido Staked Ether' || 'XRP' || 'Dogecoin' || 'Toncoin') && <td>$ {(price.current_price).toLocaleString()}</td> }
        {index <= 9 && (price.name === 'Bitcoin' || 'Ethereum' || 'Tether' || 'BNB' || 'Solana' || 'USDC' || 'Lido Staked Ether' || 'XRP' || 'Dogecoin' || 'Toncoin') && <td>$ {(price.market_cap / 1000000000).toLocaleString()} Billion</td>}
        {index <= 9 && (price.name === 'Bitcoin' || 'Ethereum' || 'Tether' || 'BNB' || 'Solana' || 'USDC' || 'Lido Staked Ether' || 'XRP' || 'Dogecoin' || 'Toncoin') && price.price_change_percentage_24h >= 0 && <td className="green"><div><i className="fa-solid fa-arrow-up green"></i> +{(price.price_change_percentage_24h).toLocaleString()} %</div></td>}
        {index <= 9 && (price.name === 'Bitcoin' || 'Ethereum' || 'Tether' || 'BNB' || 'Solana' || 'USDC' || 'Lido Staked Ether' || 'XRP' || 'Dogecoin' || 'Toncoin') && price.price_change_percentage_24h < 0 && <td className="red"><div><i className="fa-solid fa-arrow-down red"></i> {(price.price_change_percentage_24h).toLocaleString()} %</div></td>}
      </tr>
  ))

  return (
    <div className="prices">
      <h1>CRYPTO PRICES</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {
              showPrices
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

