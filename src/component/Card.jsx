
const Card = ({ img, title, rate }) => {

    return (
        <div className="card">
            <img
                src={img || "./src/assets/card.webp"}
                alt="img"
                className="card-img"
            />
            <div className="card-body">
                <p className="cart-title">{title || "untitled"}</p>
                <div className="rate">
                    <div>
                        <svg viewBox="0 -0.5 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" width={16}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>star</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-903.000000, -411.000000)" fill="#FF6E6E"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="star" transform="translate(858.000000, 234.000000)"> <g transform="translate(7.000000, 8.000000)" id="Shape"> <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"> </polygon> </g> </g> </g> </g> </g> </g></svg>
                    </div>
                    <p style={{ fontSize: '12px', height: '16px', marginLeft: '5px' }}>{rate ? rate.toFixed(1) : (0).toFixed(1)}</p>
                </div>
            </div>
        </div >
    );
}

export default Card 