# geog458-CovidMaps: US Covid Cases in 2020

## Maps

The following maps draw information from the [New York Times US covid data](https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv) to plot the distribution of the pandemic and compare its spread across the country. These maps are intended for all citizens of the United States to promote awareness about the spread of Covid and to better inform their actions. Addtionally, state and healthcare officials can use these maps to help allocate funding or direct aid.

![A choropleth map of covid case rates](/imgs/map1.png)

This choropleth map shows the rate of covid cases in the US (cases per 1,000 people) in 2020 by county. The darker red the color of the county on the map, the higher the rate of covid cases. Hovering over a county will display the county name and the covid case rate. [View map](https://maxjayne-1860279.github.io/geog458-CovidMaps/map1.html)

![A proportional symbol map of covid cases](/imgs/map2.png)

This proportional symbol map highlights which US counties had the largest numbers of covid cases, not accounting for population differences. The greater the size and darker the color of the symbol, the more cases in that specific county. Clicking on a county will display it's total cases. [View map](https://maxjayne-1860279.github.io/geog458-CovidMaps/map2.html)

## Credits

*Data:* Covid case data sourced from [The NYTimes](https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv). Population data from [2018 ACS 5-year estimates](https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true). County Shapefile from [the US Census Bureau](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html). MapBox JS. MapShaper.

*Acknowledgements:* These maps designed using scripts provided in the [GEOG-458: Advanced Digital Geographies (lab 03)](https://github.com/jakobzhao/geog458/tree/master/labs/lab03) designed by Bo Zhao with help from Steven Bao.