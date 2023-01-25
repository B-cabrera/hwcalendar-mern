import "../styles/BookShelf.css"

// possibly sort class names by length to be more aesthetically
let classes = [
    "Discrete Math",
    "Intro to Business",
    "American Short Fiction",
    "Computer Organization & Architecture"
];

const classList = classes.map((className, index) => {
    return (<li key={index}>{className}</li>);
})

export default function BookShelf() {


    return (
        <ul id="books">{classList}</ul>
    );
}


