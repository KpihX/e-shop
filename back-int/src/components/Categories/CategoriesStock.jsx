import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";
import axiosClient from "../../axiosClient";

const CategoriesStock = ({ selectedCategory, setSelectedCategory, setCurrentPage }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosClient.get("/shop/categories")
      .then(({ data }) => {
        setCategories([{ idCat: -1, nomCat: "Tous" }, ...data.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving categories:", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (idCat) => {
    console.log("Edit category with id:", idCat);
  };

  const handleDelete = (idCat) => {
    console.log("Delete category with id:", idCat);
  };

  const handleMouseEnter = (idCat) => {
    setHoveredCategory(idCat);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="container flex justify-evenly rounded-none border-b border-orange-100 bg-transparent p-5">
      {isLoading ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        categories.map(({ idCat, nomCat }) => (
          <div
            key={idCat}
            value={nomCat}
            onClick={() => {
              setSelectedCategory(idCat);
              setCurrentPage(0);
              setActiveTab(nomCat);
            }}
            className={
              selectedCategory === idCat
                ? "text-primary flex items-center justify-between flex-col bg-inherit"
                : "bg-inherit flex items-center justify-between flex-col"
            }
          >
            {nomCat}
              <div className="flex justify-center flex-row">
                <Tooltip content="Modifier">
                  <PencilIcon
                    className="cursor-pointer mx-2"
                    onClick={() => handleEdit(idCat)}
                    color="black"
                  />
                </Tooltip>
                <Tooltip title="Supprimer">
                  <TrashIcon
                    className="cursor-pointer"
                    onClick={() => handleDelete(idCat)}
                    color="black"
                  />
                </Tooltip>
              </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoriesStock;

