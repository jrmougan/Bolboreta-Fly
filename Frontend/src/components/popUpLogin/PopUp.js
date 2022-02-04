import "./popup.css";

const PopUp = ({ setShowPopUp, children }) => {
    return (
        <section onClick={() => setShowPopUp(false)} id="popup_background">
            <article id="popup_foreground" onClick={(e) => e.stopPropagation()}>
                {children}
            </article>
        </section>
    );
};

export default PopUp;