import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {


  const getItemName = (itemName) => {
    // Add conditions based on item names here
    // Example:
    if (itemName === 'Shoes') {
        return 'NetMeds';
    } else if (itemName === 'Sunglasses') {
        return 'Emcure';
    } else if (itemName === 'Watch') {
        return 'Healthify';
    } else if (itemName === 'Camera') {
        return 'Zepto';
    } else if (itemName === 'Drone') {
        return 'BigBasket';
    } else if (itemName === 'Headset') {
        return 'Dunzo';
    } else if (itemName === 'Puzzle Cube') {
        return 'Accenture IPO';
    } else if (itemName === 'Train Set') {
        return 'Tata Tech IPO';
    } else if (itemName === 'Robot Set') {
        return 'Infosys IPO';
    } else {
        return "Doms IPO"; // Default return
    }
};

const getImageUrl = (itemName) => {
    // Add conditions based on item image URLs here
    // Example:
    if (itemName === 'Shoes') {
        return 'data:image/png;base64,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';
    } else if (itemName === 'Sunglasses') {
        return 'data:image/png;base64,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';
    } else if (itemName === 'Watch') {
        return 'https://play-lh.googleusercontent.com/9NCPUYlB7165VMxuMEvI5BhP86mGcBOvcz-LQH2TLn10qF9t3xQE_p4ek5-zWdIu';
    } else if (itemName === 'Camera') {
        return 'https://play-lh.googleusercontent.com/tjzK0-TCkXB1zxkmiRr5WNGJxQy87s1RdBx10nqLbdxRIH7bPWxTkH_YiUMbYPFRfmj7';
    } else if (itemName === 'Drone') {
        return 'data:image/jpeg;base64,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';
    } else if (itemName === 'Headset') {
        return 'data:image/png;base64,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';
    } else if (itemName === 'Puzzle Cube') {
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKP-w5X1k8z9OKMpUo3ZUP_AXr0HjkeHu9GQ';
    } else if (itemName === 'Train Set') {
        return 'https://www.tata.com/content/dam/tata/images/home-page/desktop/logo_card_desktop_362x362.jpg';
    } else if (itemName === 'Robot Set') {
        return 'data:image/png;base64,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';
    } else {
        return "Doms IPO"; // Default return
    }
};

const getItemDescription = (itemName) => {
    // Add conditions based on item names here
    // Example:
    if (itemName === 'Shoes') {
        return 'Netmeds.com is one of Indias most trusted pharmacies, dispensing quality medicines at reasonable prices to over 9 million happy customers – PAN India. At netmeds.com, we help you look after your own health effortlessly as well as take care of loved ones wherever they may reside in India.';
    } else if (itemName === 'Sunglasses') {
        return 'We are a fast-growing Indian pharmaceutical company engaged in developing, manufacturing, and marketing a broad range of biopharmaceutical products globally. Emcures differentiated product portfolio lends an unparalleled competitive advantage establishing its presence in all major therapies in the domestic market..';
    } else if (itemName === 'Watch') {
        return 'Healthify provides access to networks of social service organizations, supported by a collaborative technology platform, and advisory services to help payors and at-risk providers address social deterinants of health (SDOH) at scale..';
    } else if (itemName === 'Camera') {
        return 'An online grocery company swiftly delivers a variety of prepared food items, including hot beverages and snacks, to customers doorsteps. Customers can conveniently purchase these products online for prompt home delivery.';
    } else if (itemName === 'Drone') {
        return 'BigBasket is an Indian online grocer headquartered in Bangalore, India, and currently owned by Tata Digital. It was the first online grocer in India.';
    } else if (itemName === 'Headset') {
        return 'Dunzo is an Indian company that delivers fruits and vegetables, meat, pet supplies, food, and medicines in major cities..';
    } else if (itemName === 'Puzzle Cube') {
        return 'The company operates business processes for enterprise functions such as sourcing and procurement, finance and accounting, supply chain, marketing, and sales..';
    } else if (itemName === 'Train Set') {
        return 'Tata Technologies Limited is an Indian multinational product engineering company that provides services in engineering and design, product lifecycle management, manufacturing, product development.';
    } else if (itemName === 'Robot Set') {
        return 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.';
    } else {
        return "Doms IPO is a default item with a placeholder description."; // Default return
    }
};


  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await dappazon.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()

    // Buy item...
    let transaction = await dappazon.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()

    setHasBought(true)
  }

  useEffect(() => {
    fetchDetails();
  }, [hasBought, fetchDetails]);

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={getImageUrl(item.name)} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{getItemName(item.name)}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
          {getItemDescription(item.name)}

           
          </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>

          <p><small>Ships from</small> Dappazon</p>
          <p><small>Sold by</small> Dappazon</p>

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>


        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default Product;