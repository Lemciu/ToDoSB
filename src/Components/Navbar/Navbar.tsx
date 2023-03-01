import "./navbar.css"
import React, {useEffect, useState} from "react";

interface Props {
    setSortFlag: Function;
}

function Navbar({setSortFlag}: Props) {
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {

        fetch("http://localhost:8080/categories", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((json) => setCategories(json));

    }, [])

    function Print(value: string) {
        setSort(value);
        console.log(value)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navBar" id="navbarSupportedContent">
                    <div>
                        <div className="dropdown">
                            <button className="btn btn-light"><span>Category</span></button>
                            <div className="dropdown-content">
                                <div className="form-check">
                                    {categories.map((category: any) => (
                                        <div key={category.name}>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <p>{category.name}</p>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-light"><span>Sort By</span></button>
                            <div className="dropdown-content">
                                <ul className="sortList">
                                    <li><button onClick={() => setSortFlag("/priority-asc")}>Priority Asc</button></li>
                                    <li><button onClick={() => setSortFlag("/priority-desc")}>Priority Desc</button></li>
                                    <li><button onClick={() => setSortFlag("/date-asc")}>Date Asc</button></li>
                                    <li><button onClick={() => setSortFlag("/date-desc")}>Date Desc</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e) =>Print(e.target.value)}/>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar