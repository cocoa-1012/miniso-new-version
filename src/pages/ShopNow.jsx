import Container from "@mui/material/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Products from "../components/layout/Products/Products";
import classes from "./ShopNow.module.css";
import {
  Bottom,
  FilterContainer,
  Info,
  Option,
  Select,
  Sortby,
  Summary,
  Title,
  Top,
  TopTexts,
  Wrapper,
} from "./styled/ShopNow.styled";

const ShopNow = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters] = useState({});
  const [sort, setSort] = useState("newest");
  let history = useHistory();

  const handleFilters = async (event) => {
    const value = event.target.value;
    try {
      history.push(`/productoslista/${value}`);
      history.go(`/productoslista/${value}`);
    } catch (err) {
      console.log("- - - - - err: ", err);
    }
    /*
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
      */
  };

  const [categories, setCategories] = useState([]);
  let catUrl = "http://3.16.73.177:9080/public/categories/first";

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await axios.get(catUrl, {
      crossDomain: true,
    });
    setCategories(res.data.body);
  };

  return (
    <div>
      <div className={classes.TopheaderContainer}>
        <div className={classes.ImgContainer}>
          <img
            className={classes.Image}
            src="./img/categories/Promociones.png"
            alt=""
          />
        </div>
      </div>
      <Container fixed>
        <h1>Comprar Ahora</h1>
      </Container>
      <Wrapper>
        <Title>Lista de Productos</Title>
        <p></p>
        <Top>
          {/*<TopButton>CONTINUE SHOPPING</TopButton>*/}
          <TopTexts>{/*<TopText>No. Resultados</TopText>*/}</TopTexts>
          <Sortby>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Ordenar</Option>
              <Option Option value="asc">
                Precio más alto
              </Option>
              <Option value="desc">Precio más bajo</Option>
            </Select>
          </Sortby>
        </Top>
        <Bottom>
          <Summary>
            <h1>Filtros</h1>
            <FilterContainer>
              <Select value={cat} name="categoría" onChange={handleFilters}>
                {categories.map((category) => (
                  <Option value={category.codCatUno}>
                    {category.descripcion}
                  </Option>
                ))}
              </Select>
              {/*<Select name='size' onChange={handleFilters}>
                <Option disabled>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                </Select>*/}
            </FilterContainer>
          </Summary>
          <Info>
            <Products cat={"04"} filters={filters} sort={sort} />
          </Info>
        </Bottom>
      </Wrapper>
    </div>
  );
};

export default ShopNow;
