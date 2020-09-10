// Variables
const brand = document.querySelector('#marca');
const year = document.querySelector('#year');
const priceMin = document.querySelector('#minimo');
const priceMax = document.querySelector('#maximo');
const doors = document.querySelector('#puertas');
const transmission = document.querySelector('#transmision');
const color = document.querySelector('#color');
// Year actual
const yearMax = new Date().getFullYear();
//Year minimo
const yearMin = yearMax - 10;
// General Objeto con los datos de la busqueda
const searchDate = {
  brand: '',
  year: '',
  priceMin: '',
  priceMax: '',
  doors: '',
  transmission: '',
  color: '',
};

document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); // Muestra los autos al cargar
  //Llena las opciones del year
  completarSelect();
});

const mostrarAutos = (autos) => {
  cleanHtml();
  autos.forEach(
    ({ marca, modelo, year, precio, puertas, color, transmision }) => {
      const autoHtml = document.createElement('p');
      autoHtml.textContent = `${marca} ${modelo} - Año: ${year} - Color: ${color} - Puertas: ${puertas} - Transmision: ${transmision} - Precio: $${precio}`;
      resultado.append(autoHtml);
    }
  );
};
// Limpiar autoHtml
const cleanHtml = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};
//Genera los anios del Select
const completarSelect = () => {
  for (let i = yearMax; i > yearMin; i--) {
    const option = document.createElement('option');
    option.textContent = i;
    option.value = i;
    year.append(option); // Agrega el option con los valores
  }
};

//addEventListener al formulario
brand.addEventListener('change', (e) => {
  searchDate.brand = e.target.value;
  filterCars();
});
year.addEventListener('change', (e) => {
  searchDate.year = parseInt(e.target.value);
  filterCars();
});
priceMin.addEventListener('change', (e) => {
  searchDate.priceMin = e.target.value;
  filterCars();
});

priceMax.addEventListener('change', (e) => {
  searchDate.priceMax = e.target.value;
  filterCars();
});

doors.addEventListener('change', (e) => {
  searchDate.doors = parseInt(e.target.value);
  filterCars();
});

transmission.addEventListener('change', (e) => {
  searchDate.transmission = e.target.value;
  filterCars();
});

color.addEventListener('change', (e) => {
  searchDate.color = e.target.value;
  filterCars();
});
// Filtar los autos  en base a la busqueda
const filterCars = () => {
  const car = autos
    .filter(filterBrand)
    .filter(filterYear)
    .filter(filterPriceMin)
    .filter(filterPriceMax)
    .filter(filterDoors)
    .filter(filterTransmission)
    .filter(filterColor);
  if (car.length) {
    mostrarAutos(car);
  } else {
    notResult();
  }
};
const notResult = () => {
  const error = document.createElement('div');
  error.classList.add('error', 'alerta');
  error.textContent =
    'No hay Resultado, Intenta con otros terminos de Busqueda';
  cleanHtml();
  resultado.append(error);
};
const filterBrand = (auto) => {
  const { brand } = searchDate;
  if (brand) {
    return brand === auto.marca;
  } else {
    return auto;
  }
};

const filterYear = (auto) => {
  const { year } = searchDate;
  if (year) {
    return year === auto.year;
  } else {
    return auto;
  }
};
const filterPriceMin = (auto) => {
  const { priceMin } = searchDate;
  if (priceMin) {
    return auto.precio >= priceMin;
  } else {
    return auto;
  }
};
const filterPriceMax = (auto) => {
  const { priceMax } = searchDate;
  if (priceMax) {
    return auto.precio <= priceMax;
  } else {
    return auto;
  }
};
const filterDoors = (auto) => {
  const { doors } = searchDate;
  if (doors) {
    return doors === auto.puertas;
  } else {
    return auto;
  }
};
const filterTransmission = (auto) => {
  const { transmission } = searchDate;
  if (transmission) {
    return transmission === auto.transmision;
  } else {
    return auto;
  }
};
const filterColor = (auto) => {
  const { color } = searchDate;
  if (color) {
    return color === auto.color;
  } else {
    return auto;
  }
};
