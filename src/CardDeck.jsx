import Cards from "./Cards";

function CardDeck(props){
    const assets = props.assets;
    const deck= assets.map((asset) =>

        <Cards asset = {asset}/>
    );
    return(deck);

}
export default CardDeck;
