import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/home-style.css';

function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const savedState = localStorage.getItem('expandedCategories');
    if (savedState) {
      setExpandedCategories(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expandedCategories', JSON.stringify(expandedCategories));
  }, [expandedCategories]);

  const toggleCategory = (index) => {
    setExpandedCategories(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const categories = [
    { 
      name: "Computación", 
      ids: ["MLA16543", "MLA1652", "MLA1720", "MLA14407", "MLA1676"],
      subcategories: [
        { name: "Notebooks y accesorios", id: ["MLA16543", "MLA1652"] },
        { name: "Estabilizadores y UPS", id: "MLA1720" },
        { name: "Monitores y Accesorios", id: "MLA14407" },
        { name: "Impresión", id: "MLA1676" }
      ] 
    },
    {
      name: "Electrónica, Audio y Video",
      ids: ["MLA8618", "MLA1002"],
      subcategories: [
        { name: "Audio", id: "MLA8618" },
        { name: "Televisores", id: "MLA1002" }
      ]
    },
    { name: "Cámaras y accesorios", id: "MLA430383" },
    { 
      name: "Todo", 
      id: "/" 
    }
  ];

  return (
    <div className="sidebar">
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <div className="category-header">
              <Link
                to={category.id === "/" ? "/" : `/category/${category.ids ? category.ids.join(',') : category.id}`}
                className="category-link"
              >
                {category.name}
              </Link>
              {category.subcategories && (
                <button
                  className="toggle-button"
                  onClick={() => toggleCategory(index)}
                >
                  {expandedCategories[index] ? '-' : '+'}
                </button>
              )}
            </div>
            {expandedCategories[index] && category.subcategories && (
              <ul className={`subcategory-list`}>
                {category.subcategories.map((sub, subIndex) => (
                  <li key={subIndex} className={`subcategory-item level-${subIndex}`}>
                    <span className="subcategory-marker">-</span>
                    <Link to={`/category/${Array.isArray(sub.id) ? sub.id.join(',') : sub.id}`}>{sub.name}</Link>
                    {sub.subcategories && (
                      <ul className={`subcategory-list`}>
                        {sub.subcategories.map((innerSub, innerIndex) => (
                          <li key={innerIndex} className={`subcategory-item level-${subIndex}-${innerIndex}`}>
                            <span className="subcategory-marker">-</span>
                            <Link to={`/category/${Array.isArray(innerSub.id) ? innerSub.id.join(',') : innerSub.id}`}>{innerSub.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
