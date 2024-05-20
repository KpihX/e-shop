import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axiosClient from '../../axiosClient'
 
export default function Categories({ selectedCategory, setSelectedCategory, setCurrentPage }) {
  const [categories, setCategories] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("html")
  
  React.useEffect(() => {
    setLoading(true)
    axiosClient.get('/shop/categories')
      .then(({data}) => {
        setCategories([{idCat: -1, nomCat: "Tous"} , ...data.data])
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories: ", error);
        setLoading(false)
      })
  }, [])

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-orange-100 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-primary shadow-none rounded-none",
        }}
      >
        {isLoading ? <p className="text-center">Catégories...</p> : 
          categories.map(({ idCat, nomCat }) => (
          <Tab
            key={idCat}
            value={nomCat}
            onClick={() => {setSelectedCategory(idCat); setCurrentPage(0); setActiveTab(nomCat)}}
            className={selectedCategory === idCat ? "text-primary" : ""}
          >
            {nomCat}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}