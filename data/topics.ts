import { GISTopicFull, Category, Difficulty, Plugin, CommonError, Dataset } from '../types';

export const topics: GISTopicFull[] = [
  {
    id: 1,
    cat: "environment",
    icon: "🌍",
    color: "rgba(74,222,128,0.15)",
    title: "GIS for Climate Change Analysis",
    desc: "Studying the role of GIS in assessing climate change impacts on ecosystems.",
    tags: ["Climate", "Ecosystem", "Raster Analysis"],
    difficulty: "Beginner",
    estimatedTime: "~4 hours",
    tools: ["QGIS", "Google Earth Engine", "SAGA GIS", "R (raster pkg)"],
    steps: [
      "Install QGIS and the Semi-Automatic Classification Plugin (SCP) for land cover analysis.",
      "Download historical temperature/precipitation raster data from WorldClim or ERA5.",
      "Load climate rasters into QGIS using Layer > Add Layer > Add Raster Layer.",
      "Use Raster Calculator to compute anomalies: subtract baseline from current period.",
      "Overlay with ecosystem vector layers (biomes, forests) from WWF or GBIF.",
      "Run zonal statistics to quantify climate changes per ecosystem zone.",
      "Visualize trends using graduated color maps and export as print layout.",
      "Optionally connect to Google Earth Engine via the GEE Plugin for time-series analysis."
    ],
    datasets: [
      { name: "WorldClim v2 - Historical Climate Data", url: "https://worldclim.org/data/worldclim21.html" },
      { name: "ERA5 Reanalysis Data (Copernicus)", url: "https://cds.climate.copernicus.eu" },
      { name: "NASA MODIS Land Cover", url: "https://lpdaac.usgs.gov/products/mcd12q1v006/" },
      { name: "WWF Terrestrial Ecoregions", url: "https://www.worldwildlife.org/publications/terrestrial-ecoregions-of-the-world" }
    ],
    plugins: [
      {
        name: "Semi-Automatic Classification Plugin (SCP)",
        installSteps: ["Open QGIS", "Plugins > Manage and Install Plugins", "Search for 'Semi-Automatic Classification'", "Click Install"],
        menuPath: "SCP > Band set"
      },
      {
        name: "Google Earth Engine Plugin",
        installSteps: ["Install Python GEE API", "In QGIS: Plugins > Manage and Install Plugins", "Search for 'Google Earth Engine'", "Authenticate with Google account"]
      }
    ],
    commonErrors: [
      {
        error: "CRS Mismatch",
        cause: "Raster and vector layers use different coordinate reference systems.",
        fix: "Right-click layer > Export > Save Features As... and select a matching CRS (e.g., EPSG:4326)."
      },
      {
        error: "Raster Calculator Syntax Error",
        cause: "Incorrect syntax or layer names in the expression.",
        fix: "Ensure layer names are wrapped in double quotes and operators are correctly placed."
      },
      {
        error: "No Data in Zonal Statistics",
        cause: "The vector and raster layers do not overlap spatially.",
        fix: "Zoom to layer extent for both to verify overlap and check CRS alignment."
      }
    ]
  },
  {
    id: 2,
    cat: "urban",
    icon: "🌡️",
    color: "rgba(239,68,68,0.15)",
    title: "Urban Heat Island Mapping",
    desc: "Using GIS to map and analyze urban heat islands in cities.",
    tags: ["Urban", "Thermal", "Landsat", "LST"],
    difficulty: "Beginner",
    estimatedTime: "~5 hours",
    tools: ["QGIS", "SCP Plugin", "Landsat Imagery", "Python (rasterio)"],
    steps: [
      "Download Landsat 8/9 imagery for your city from USGS EarthExplorer (bands 4, 5, 10, 11).",
      "Open QGIS and load the thermal infrared bands (Band 10 & 11).",
      "Install the Semi-Automatic Classification Plugin (SCP) for atmospheric correction.",
      "Convert DN (Digital Numbers) to Land Surface Temperature (LST) using the thermal band formula.",
      "Calculate NDVI using NIR and Red bands via Raster Calculator: (NIR - Red) / (NIR + Red).",
      "Compute emissivity from NDVI values and feed into LST retrieval equation.",
      "Apply a diverging color ramp (cool-to-warm) to visualize hot spots.",
      "Overlay with city boundary and urban land use layers for context."
    ],
    datasets: [
      { name: "USGS EarthExplorer - Landsat 8/9", url: "https://earthexplorer.usgs.gov" },
      { name: "OpenStreetMap Urban Boundaries", url: "https://www.openstreetmap.org" },
      { name: "Global Urban Footprint (DLR)", url: "https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/" },
      { name: "NASA MODIS LST (MOD11A1)", url: "https://lpdaac.usgs.gov/products/mod11a1v006/" }
    ],
    plugins: [
      {
        name: "Semi-Automatic Classification Plugin",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'SCP'", "Install Plugin"],
        menuPath: "SCP > Preprocessing > Landsat"
      }
    ],
    commonErrors: [
      {
        error: "Invalid LST Values",
        cause: "Calculation performed on raw DN values instead of Top of Atmosphere (TOA) reflectance.",
        fix: "Run SCP Preprocessing on Landsat bands before LST calculation."
      },
      {
        error: "NDVI Division by Zero",
        cause: "Zero values in both NIR and Red bands (e.g., outside image footprint).",
        fix: "Use a conditional mask in Raster Calculator to ignore zero values: (NIR + Red) != 0."
      },
      {
        error: "Thermal Band Metadata Missing",
        cause: "MLT file not provided or renamed.",
        fix: "Ensure the Landsat metadata file (*_MTL.txt) is in the same folder as the TIF files."
      }
    ]
  },
  {
    id: 3,
    cat: "disaster",
    icon: "🌊",
    color: "rgba(59,130,246,0.15)",
    title: "Flood Risk Assessment using GIS",
    desc: "Flood prediction and mitigation strategies using GIS and Remote Sensing.",
    tags: ["Flood", "DEM", "Risk", "Remote Sensing"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "SAGA GIS", "HEC-RAS", "GRASS GIS"],
    steps: [
      "Obtain a Digital Elevation Model (DEM) from SRTM or ALOS PALSAR.",
      "Load DEM in QGIS and run Fill Sinks via SAGA (Processing > SAGA > Terrain Analysis).",
      "Generate flow direction and flow accumulation rasters using SAGA or GRASS.",
      "Delineate watershed boundaries using the SAGA Watershed Basins tool.",
      "Download historical rainfall data and overlay flood-prone zones using flood hazard maps.",
      "Classify flood risk levels (Low/Medium/High) using Raster Calculator thresholds.",
      "Overlay population or infrastructure layers to assess exposure.",
      "Export flood risk map as PDF using QGIS Print Layout."
    ],
    datasets: [
      { name: "SRTM 30m DEM (NASA)", url: "https://www2.jpl.nasa.gov/srtm/" },
      { name: "ALOS DEM (JAXA)", url: "https://www.eorc.jaxa.jp/ALOS/en/aw3d30/" },
      { name: "Global Flood Database (GFD)", url: "https://global-flood-database.cloudtostreet.ai" },
      { name: "NOAA Precipitation Data", url: "https://www.ncei.noaa.gov/products/precipitation" }
    ],
    plugins: [
      {
        name: "SAGA GIS Processing Provider",
        installSteps: ["Standard with QGIS", "Enable in Processing Toolbox > Options > Providers"],
        menuPath: "Processing Toolbox > SAGA"
      },
      {
        name: "Crayfish",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Crayfish'", "Install"],
        menuPath: "Mesh > Crayfish"
      }
    ],
    commonErrors: [
      {
        error: "Sinks not filled",
        cause: "Water flow stops at depressions in the DEM.",
        fix: "Run 'Fill Sinks' (Wang & Liu or Planchon/Darboux) before flow analysis."
      },
      {
        error: "Incorrect Watershed Extent",
        cause: "Flow accumulation threshold set too high.",
        fix: "Lower the threshold value in the Channel Network tool to capture smaller sub-basins."
      },
      {
        error: "Projection Distortion",
        cause: "Using Geographic (Lat/Lon) CRS for area/slope calculations.",
        fix: "Reproject DEM to a Projected CRS (e.g., UTM) before analysis."
      }
    ]
  },
  {
    id: 4,
    cat: "urban",
    icon: "🏙️",
    color: "rgba(139,92,246,0.15)",
    title: "GIS for Sustainable Urban Planning",
    desc: "Optimizing land use and infrastructure for sustainable urban development.",
    tags: ["Urban", "Land Use", "Planning", "Vector"],
    difficulty: "Beginner",
    estimatedTime: "~6 hours",
    tools: ["QGIS", "OpenStreetMap", "Urban Atlas", "InVEST"],
    steps: [
      "Download city administrative boundaries and land use data from OpenStreetMap or national GIS portals.",
      "Load layers into QGIS and style by land use category (residential, commercial, green space, etc.).",
      "Compute green space ratio: Use Field Calculator to divide park area by total city area.",
      "Run Accessibility Analysis using Network Analyst or QNEAT3 plugin for transit coverage.",
      "Overlay population density data to identify underserved areas.",
      "Use Suitability Analysis (Weighted Overlay) for new development site selection.",
      "Apply multi-criteria evaluation: slope, proximity to water, existing infra.",
      "Generate a decision map and export for planning report."
    ],
    datasets: [
      { name: "OpenStreetMap Data", url: "https://download.geofabrik.de" },
      { name: "Urban Atlas (Copernicus)", url: "https://land.copernicus.eu/local/urban-atlas" },
      { name: "WorldPop Population Data", url: "https://www.worldpop.org" },
      { name: "Global Human Settlement Layer (GHSL)", url: "https://ghsl.jrc.ec.europa.eu" }
    ],
    plugins: [
      {
        name: "QuickOSM",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'QuickOSM'", "Install"],
        menuPath: "Vector > QuickOSM"
      },
      {
        name: "QNEAT3",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'QNEAT3'", "Install"],
        menuPath: "Processing Toolbox > QNEAT3"
      }
    ],
    commonErrors: [
      {
        error: "Topology Overlaps",
        cause: "OSM polygons may overlap or have gaps.",
        fix: "Use 'Check Validity' or 'v.clean' from GRASS to fix geometry errors."
      },
      {
        error: "Joined Data Nulls",
        cause: "Mismatch in join fields (e.g., 'London' vs 'LONDON').",
        fix: "Ensure join keys match exactly in case and whitespace before running Join Attributes."
      },
      {
        error: "Incorrect Area Calculation",
        cause: "Calculating area in degrees instead of meters.",
        fix: "Project the layer to a local UTM zone and use $area in Field Calculator."
      }
    ]
  },
  {
    id: 5,
    cat: "environment",
    icon: "💨",
    color: "rgba(100,116,139,0.25)",
    title: "Spatial Analysis of Air Quality",
    desc: "Integrating GIS and Remote Sensing for air pollution monitoring and management.",
    tags: ["Air Quality", "NO2", "Interpolation", "Health"],
    difficulty: "Intermediate",
    estimatedTime: "~8 hours",
    tools: ["QGIS", "Sentinel-5P", "Python (pandas)", "IDW Interpolation"],
    steps: [
      "Download Sentinel-5P NO2/PM2.5 data from Copernicus Open Access Hub.",
      "Load NetCDF files into QGIS using the NetCDF raster loader.",
      "Clip data to your study area using the Clip Raster by Extent tool.",
      "Collect ground-station air quality CSV data from EPA or local monitoring agencies.",
      "Import CSV as delimited text layer (lat/lon columns) in QGIS.",
      "Run IDW Interpolation (Raster > Interpolation > IDW) on station data.",
      "Compare satellite vs ground station data using Raster Calculator.",
      "Style with a custom color ramp (green to red) showing pollution gradient."
    ],
    datasets: [
      { name: "Copernicus Sentinel-5P Tropomi", url: "https://s5phub.copernicus.eu" },
      { name: "OpenAQ Air Quality Data", url: "https://openaq.org" },
      { name: "EPA Air Quality System", url: "https://www.epa.gov/aqs" },
      { name: "WHO Ambient Air Quality Database", url: "https://www.who.int/data/gho/data/themes/air-pollution" }
    ],
    plugins: [
      {
        name: "NetCDF Browser",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'NetCDF'", "Install"],
        menuPath: "Layer > Add Layer > Add Mesh Layer"
      }
    ],
    commonErrors: [
      {
        error: "NetCDF Layer not showing",
        cause: "Multiple variables in file; QGIS needs to know which to display.",
        fix: "In 'Add Raster Layer', select the specific sub-dataset (e.g., NO2_column_amount)."
      },
      {
        error: "Interpolation Artifacts",
        cause: "Stations too far apart or IDW power parameter too high.",
        fix: "Adjust IDW power (try 2.0) or use Kriging for better spatial correlation."
      },
      {
        error: "CSV Import Offset",
        cause: "Incorrect X (Longitude) and Y (Latitude) mapping.",
        fix: "Verify columns: X should be Longitude, Y should be Latitude in Import dialog."
      }
    ]
  },
  {
    id: 6,
    cat: "environment",
    icon: "🔬",
    color: "rgba(34,197,94,0.15)",
    title: "GIS in Environmental Impact Assessment",
    desc: "Using GIS to assess the impact of development projects on the environment.",
    tags: ["EIA", "Overlay", "Biodiversity", "Vector"],
    difficulty: "Beginner",
    estimatedTime: "~4 hours",
    tools: ["QGIS", "InVEST", "GBIF", "OpenStreetMap"],
    steps: [
      "Define the project area and create a study boundary polygon in QGIS.",
      "Collect baseline layers: vegetation, water bodies, protected areas, soil type.",
      "Download biodiversity data (species locations) from GBIF or national databases.",
      "Perform buffer analysis around the project site (500m, 1km, 5km zones).",
      "Overlay sensitive areas (wetlands, forest, protected zones) with project footprint.",
      "Calculate area of impact using Field Calculator and Intersection tools.",
      "Run change detection between pre-project and projected post-project land cover.",
      "Generate impact score matrix and export as a map series."
    ],
    datasets: [
      { name: "GBIF Biodiversity Data", url: "https://www.gbif.org" },
      { name: "Protected Planet (WDPA)", url: "https://www.protectedplanet.net" },
      { name: "Global Forest Watch", url: "https://www.globalforestwatch.org" },
      { name: "FAO GeoNetwork Soils", url: "https://www.fao.org/geonetwork" }
    ],
    plugins: [
      {
        name: "Multi-Distance Buffer",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Multi-Distance Buffer'", "Install"],
        menuPath: "Vector > Geoprocessing Tools"
      }
    ],
    commonErrors: [
      {
        error: "Buffer size is massive",
        cause: "Layer in degrees (WGS84) but distance entered as meters.",
        fix: "Reproject layer to UTM or enter buffer distance in decimal degrees (not recommended)."
      },
      {
        error: "Intersection returns zero features",
        cause: "No physical overlap or CRS misalignment.",
        fix: "Check that both layers are in the same CRS and verify spatial overlap."
      },
      {
        error: "Invalid Geometry in Intersection",
        cause: "Self-intersecting polygons in input layers.",
        fix: "Run 'Fix Geometries' on both layers before performing the intersection."
      }
    ]
  },
  {
    id: 7,
    cat: "disaster",
    icon: "🔥",
    color: "rgba(249,115,22,0.15)",
    title: "Forest Fire Risk Mapping",
    desc: "Modeling and predicting forest fire risk using GIS.",
    tags: ["Fire", "DEM", "NDVI", "Risk Model"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "MODIS Fire Data", "SAGA GIS", "Python"],
    steps: [
      "Download MODIS Active Fire data (MCD14ML) from NASA FIRMS.",
      "Load fire point data and forest cover rasters into QGIS.",
      "Compute NDVI from Landsat imagery to assess vegetation dryness.",
      "Get slope and aspect from DEM using QGIS Raster Terrain Analysis.",
      "Download wind speed and temperature rasters from ERA5.",
      "Build a fire risk model: combine NDVI, slope, aspect, distance to roads.",
      "Use Weighted Overlay or Raster Calculator to create composite risk raster.",
      "Classify into risk zones (Very High / High / Moderate / Low) and symbolize."
    ],
    datasets: [
      { name: "NASA FIRMS Active Fire Data", url: "https://firms.modaps.eosdis.nasa.gov" },
      { name: "MODIS NDVI Products", url: "https://lpdaac.usgs.gov/products/mod13a2v006/" },
      { name: "Global Forest Change (Hansen)", url: "https://earthenginepartners.appspot.com/science-2013-global-forest" },
      { name: "SRTM DEM for terrain", url: "https://earthexplorer.usgs.gov" }
    ],
    plugins: [
      {
        name: "SRTM-Downloader",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'SRTM-Downloader'", "Install"],
        menuPath: "Plugins > SRTM-Downloader"
      }
    ],
    commonErrors: [
      {
        error: "Incorrect Slope Calculation",
        cause: "DEM in Lat/Lon but Z-factor not adjusted.",
        fix: "Reproject DEM to UTM or use Z-factor = 0.00001 (approx) if using degrees."
      },
      {
        error: "Aspect values look wrong",
        cause: "Interpreting 0-360 degrees as a linear scale in Weighted Overlay.",
        fix: "Reclassify aspect into cardinal directions (North, East, etc.) before weighting."
      },
      {
        error: "Missing FIRMS points",
        cause: "Date filter in FIRMS downloader too narrow.",
        fix: "Expand date range in FIRMS request to capture historical fire season data."
      }
    ]
  },
  {
    id: 8,
    cat: "water",
    icon: "💧",
    color: "rgba(14,165,233,0.15)",
    title: "Hydrological Modeling with GIS",
    desc: "Analyzing surface water flow patterns and predicting water resource availability.",
    tags: ["Hydrology", "DEM", "Watershed", "Flow"],
    difficulty: "Intermediate",
    estimatedTime: "~1.5 days",
    tools: ["QGIS", "SAGA GIS", "HEC-HMS", "SWAT"],
    steps: [
      "Download SRTM or ALOS DEM for the study watershed.",
      "Pre-process DEM in SAGA: Fill Sinks > Flow Direction > Flow Accumulation.",
      "Delineate stream networks using Flow Accumulation threshold.",
      "Identify watershed/catchment boundaries using SAGA Watershed Basins.",
      "Download precipitation data from CHIRPS or rain gauges (CSV) and interpolate.",
      "Set up SWAT or HEC-HMS model parameters using the prepared layers.",
      "Simulate runoff scenarios and import output tables back to QGIS.",
      "Map water availability and risk zones, and export final hydrological map."
    ],
    datasets: [
      { name: "CHIRPS Rainfall Data", url: "https://www.chc.ucsb.edu/data/chirps" },
      { name: "HydroSHEDS Watershed Data", url: "https://www.hydrosheds.org" },
      { name: "Global Runoff Data Centre", url: "https://www.bafg.de/GRDC" },
      { name: "SRTM DEM (30m)", url: "https://www2.jpl.nasa.gov/srtm/" }
    ],
    plugins: [
      {
        name: "TauDEM",
        installSteps: ["External install", "Configure in Processing Toolbox"],
        menuPath: "Processing Toolbox > TauDEM"
      }
    ],
    commonErrors: [
      {
        error: "Streams cross ridges",
        cause: "Poor DEM resolution or sinks not filled properly.",
        fix: "Use a higher resolution DEM (ALOS 12.5m) and ensure 'Fill Sinks' is run."
      },
      {
        error: "Watershed too small",
        cause: "Pour point not aligned with the high flow accumulation cell.",
        fix: "Use 'Snap Pour Point' tool to align outlets with the stream network raster."
      },
      {
        error: "Memory Error in SAGA",
        cause: "Raster too large for SAGA processing.",
        fix: "Clip DEM to a smaller area of interest before running SAGA tools."
      }
    ]
  },
  {
    id: 9,
    cat: "environment",
    icon: "🦋",
    color: "rgba(34,197,94,0.15)",
    title: "Biodiversity Conservation with GIS",
    desc: "Using GIS to map and protect biodiversity hotspots.",
    tags: ["Biodiversity", "Species", "Hotspot", "Conservation"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "MaxEnt", "GBIF", "R (sf package)"],
    steps: [
      "Download species occurrence data from GBIF for your target species/region.",
      "Download environmental variables: bioclim layers from WorldClim.",
      "Load species points as CSV in QGIS (Add Delimited Text Layer).",
      "Run Species Distribution Modeling using MaxEnt (external tool) with QGIS layers as input.",
      "Import MaxEnt output raster into QGIS and classify by habitat suitability.",
      "Overlay protected areas (WDPA) and identify gaps in conservation coverage.",
      "Use Kernel Density Estimation to identify biodiversity hotspots.",
      "Create a conservation priority map and export."
    ],
    datasets: [
      { name: "GBIF Occurrence Records", url: "https://www.gbif.org/occurrence/search" },
      { name: "WorldClim Bioclimatic Variables", url: "https://worldclim.org/data/bioclim.html" },
      { name: "IUCN Red List Spatial Data", url: "https://www.iucnredlist.org/resources/spatial-data-download" },
      { name: "Protected Planet WDPA", url: "https://www.protectedplanet.net/en/thematic-areas/wdpa" }
    ],
    plugins: [
      {
        name: "Natusfera",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Natusfera'", "Install"],
        menuPath: "Web > Natusfera"
      }
    ],
    commonErrors: [
      {
        error: "Sampling Bias",
        cause: "Occurrence points clustered near roads or cities.",
        fix: "Use 'Spatial Thinning' to remove redundant points in R or Python before modeling."
      },
      {
        error: "MaxEnt Input Error",
        cause: "Environmental rasters have different extents or resolutions.",
        fix: "Use 'Clip Raster to Extent' and 'Align Rasters' tools in QGIS to ensure identity."
      },
      {
        error: "KDE Heatmap too blurry",
        cause: "Search radius (bandwidth) set too large.",
        fix: "Reduce bandwidth in Heatmap (KDE) settings to capture localized clusters."
      }
    ]
  },
  {
    id: 10,
    cat: "disaster",
    icon: "🚨",
    color: "rgba(239,68,68,0.15)",
    title: "GIS for Disaster Management",
    desc: "Applications of GIS in emergency preparedness, response, and recovery.",
    tags: ["Disaster", "Emergency", "Response", "Risk"],
    difficulty: "Beginner",
    estimatedTime: "~6 hours",
    tools: ["QGIS", "OpenStreetMap", "ESRI Web Maps", "GDAL"],
    steps: [
      "Collect administrative, road, and critical infrastructure data from OSM.",
      "Download hazard maps (flood, earthquake, landslide) from national agencies.",
      "Map vulnerable population groups using census data (elderly, disabled, etc.).",
      "Run proximity analysis: distance from population to hospitals, shelters, roads.",
      "Overlay all hazard layers to identify compound risk areas.",
      "Use QGIS Network Analysis (QNEAT3) to compute evacuation routes.",
      "Generate emergency response zone maps with resource allocation guidance.",
      "Share via QGIS Cloud or export to PDF for field teams."
    ],
    datasets: [
      { name: "UNDRR Global Risk Data", url: "https://risk.preventionweb.net" },
      { name: "USGS Earthquake Hazard Data", url: "https://earthquake.usgs.gov/hazards/" },
      { name: "OCHA HDX Humanitarian Data", url: "https://data.humdata.org" },
      { name: "OpenStreetMap Critical Infra", url: "https://download.geofabrik.de" }
    ],
    plugins: [
      {
        name: "QGIS Cloud",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'QGIS Cloud'", "Register account"],
        menuPath: "Web > QGIS Cloud"
      }
    ],
    commonErrors: [
      {
        error: "Network not connected",
        cause: "OSM roads not properly snapped at junctions.",
        fix: "Use 'v.clean' in GRASS with 'snap' tool to connect road endpoints."
      },
      {
        error: "Buffer distance unit error",
        cause: "Projected CRS not used for buffer tool.",
        fix: "Ensure project and layer are in a metric CRS (e.g., UTM) before buffering."
      },
      {
        error: "Layer Visibility in Web Map",
        cause: "Group layers or unsupported symbology in QGIS Cloud.",
        fix: "Flatten groups and use standard symbology for best web compatibility."
      }
    ]
  },
  {
    id: 11,
    cat: "environment",
    icon: "🌤️",
    color: "rgba(245,197,66,0.15)",
    title: "Climate Vulnerability Mapping",
    desc: "Identifying regions vulnerable to climate change effects using GIS tools.",
    tags: ["Climate", "Vulnerability", "Index", "Policy"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "Python", "WorldClim", "UNDP Data"],
    steps: [
      "Define vulnerability indicators: exposure (temperature rise), sensitivity (crop dependence), adaptive capacity (GDP, infrastructure).",
      "Download datasets for each indicator from WorldBank, UNDP, and climate portals.",
      "Normalize all indicators to a 0–1 scale using QGIS Field Calculator.",
      "Assign weights to each indicator based on literature or expert judgment.",
      "Combine weighted layers using Raster Calculator to produce a composite index.",
      "Classify the composite raster into Low/Medium/High/Very High vulnerability.",
      "Overlay administrative boundaries and add labels.",
      "Export vulnerability atlas as a map series."
    ],
    datasets: [
      { name: "ND-GAIN Country Index", url: "https://gain.nd.edu/our-work/country-index/download-data/" },
      { name: "WorldBank Development Indicators", url: "https://databank.worldbank.org/source/world-development-indicators" },
      { name: "IPCC AR6 Regional Data", url: "https://www.ipcc.ch/data/" },
      { name: "INFORM Risk Index", url: "https://drmkc.jrc.ec.europa.eu/inform-index" }
    ],
    plugins: [
      {
        name: "Spreadsheet Layers",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Spreadsheet'", "Install"],
        menuPath: "Layer > Add Layer > Add Spreadsheet Layer"
      }
    ],
    commonErrors: [
      {
        error: "Normalization Failure",
        cause: "Division by zero or incorrect range calculation.",
        fix: "Use (value - min) / (max - min) and ensure max != min."
      },
      {
        error: "Weight Sum != 1",
        cause: "Mathematical error in weight assignment.",
        fix: "Check that all weights in your Raster Calculator formula sum to exactly 1.0."
      },
      {
        error: "Admin Join missing data",
        cause: "ISO codes mismatch between CSV and Shapefile.",
        fix: "Standardize country/region codes (e.g., ISO3) in both datasets before joining."
      }
    ]
  },
  {
    id: 12,
    cat: "environment",
    icon: "🦁",
    color: "rgba(34,197,94,0.15)",
    title: "GIS in Wildlife Habitat Analysis",
    desc: "Studying wildlife migration patterns and habitat loss.",
    tags: ["Wildlife", "Habitat", "Migration", "Corridor"],
    difficulty: "Intermediate",
    estimatedTime: "~1.5 days",
    tools: ["QGIS", "Movebank", "R (adehabitatHR)", "MaxEnt"],
    steps: [
      "Download animal GPS tracking data from Movebank.",
      "Load point data into QGIS as a vector layer.",
      "Compute Home Range using Kernel Density Estimation (KDE) via QGIS or R.",
      "Download land cover data (ESA CCI or GlobCover) and classify habitats.",
      "Identify habitat patches and analyze fragmentation using Morphological Spatial Pattern Analysis.",
      "Overlay protected area boundaries to find gaps in habitat protection.",
      "Model movement corridors using Least-Cost Path analysis in SAGA.",
      "Map current vs historical habitat extent using change detection."
    ],
    datasets: [
      { name: "Movebank Animal Tracking", url: "https://www.movebank.org" },
      { name: "ESA CCI Land Cover", url: "https://www.esa-landcover-cci.org" },
      { name: "GBIF Species Occurrences", url: "https://www.gbif.org" },
      { name: "WWF WildFinder", url: "https://www.worldwildlife.org/pages/wildfinder" }
    ],
    plugins: [
      {
        name: "Animove",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Animove'", "Install"],
        menuPath: "Plugins > Animove"
      }
    ],
    commonErrors: [
      {
        error: "Home Range too large",
        cause: "Outliers in GPS data (teleportation errors).",
        fix: "Filter points by velocity or distance between timestamps to remove jumps."
      },
      {
        error: "Least Cost Path logic error",
        cause: "Friction surface values are inverted.",
        fix: "Ensure high-cost values are assigned to unsuitable habitats (e.g., urban areas)."
      },
      {
        error: "Point sequence lost",
        cause: "Sorting of GPS points is incorrect.",
        fix: "Sort the attribute table by the 'Timestamp' column before creating tracks."
      }
    ]
  },
  {
    id: 13,
    cat: "urban",
    icon: "🏗️",
    color: "rgba(139,92,246,0.15)",
    title: "3D GIS and Urban Modeling",
    desc: "Exploring 3D city models for urban planning and disaster risk reduction.",
    tags: ["3D", "CityGML", "LOD", "Urban"],
    difficulty: "Advanced",
    estimatedTime: "~2 days",
    tools: ["QGIS", "QGIS2threejs", "Blender GIS", "CityGML"],
    steps: [
      "Download building footprint data with height attributes from OSM or open city data portals.",
      "Load footprints into QGIS as a polygon vector layer.",
      "Install the QGIS2threejs plugin for 3D visualization.",
      "Configure QGIS2threejs to extrude buildings by height attribute.",
      "Add a DEM base layer for terrain-accurate 3D rendering.",
      "Alternatively, import CityGML files using the CityJSON plugin.",
      "Analyze sun exposure, shadow, and view corridors in the 3D view.",
      "Export 3D scene as interactive HTML or render in Blender GIS."
    ],
    datasets: [
      { name: "OpenStreetMap 3D Buildings", url: "https://osmbuildings.org" },
      { name: "NYC Open Data 3D Model", url: "https://www1.nyc.gov/site/doitt/initiatives/3d-building.page" },
      { name: "CityGML Open Data", url: "https://www.citygml.org/samplefiles/" },
      { name: "ALOS DEM for terrain", url: "https://www.eorc.jaxa.jp/ALOS/en/aw3d30/" }
    ],
    plugins: [
      {
        name: "QGIS2threejs",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'QGIS2threejs'", "Install"],
        menuPath: "Web > QGIS2threejs"
      },
      {
        name: "CityJSON Loader",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'CityJSON'", "Install"],
        menuPath: "Vector > CityJSON"
      }
    ],
    commonErrors: [
      {
        error: "Buildings floating/sinking",
        cause: "Elevation offset between Building layer and DEM.",
        fix: "Adjust 'Z-coordinate' in QGIS2threejs properties to 'Relative to DEM'."
      },
      {
        error: "Browser Crash on Export",
        cause: "Too many polygons (entire city) being rendered at once.",
        fix: "Clip Building layer to a smaller neighborhood before 3D export."
      },
      {
        error: "CityGML Import Failure",
        cause: "Schema mismatch in GML file.",
        fix: "Convert CityGML to CityJSON using 'cjio' tool before importing to QGIS."
      }
    ]
  },
  {
    id: 14,
    cat: "agriculture",
    icon: "🌱",
    color: "rgba(74,222,128,0.15)",
    title: "Land Use / Land Cover Change Detection",
    desc: "Analyzing land use changes over time using satellite imagery and GIS.",
    tags: ["LULC", "Change Detection", "Landsat", "Classification"],
    difficulty: "Beginner",
    estimatedTime: "~6 hours",
    tools: ["QGIS", "SCP Plugin", "Google Earth Engine", "Python"],
    steps: [
      "Download multi-temporal Landsat or Sentinel-2 imagery (two time periods) from USGS or Copernicus.",
      "Load both images in QGIS and perform atmospheric correction using the SCP plugin.",
      "Classify each image using Supervised Classification (Random Forest or Maximum Likelihood) in SCP.",
      "Define training samples for each land cover class (water, forest, urban, agriculture).",
      "Run classification for both time periods.",
      "Use Raster Calculator to create a change detection layer: subtract class maps.",
      "Generate a land cover transition matrix using the SCP Post-Processing tools.",
      "Calculate area statistics and visualize change maps."
    ],
    datasets: [
      { name: "USGS EarthExplorer Landsat", url: "https://earthexplorer.usgs.gov" },
      { name: "Copernicus Sentinel-2", url: "https://scihub.copernicus.eu" },
      { name: "ESA CCI Land Cover", url: "https://www.esa-landcover-cci.org" },
      { name: "Global Land Cover (GlobCover)", url: "http://due.esrin.esa.int/page_globcover.php" }
    ],
    plugins: [
      {
        name: "Semi-Automatic Classification Plugin",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'SCP'", "Install"],
        menuPath: "SCP > Band set"
      }
    ],
    commonErrors: [
      {
        error: "Salt and Pepper Noise",
        cause: "Pixel-based classification often leaves single misclassified pixels.",
        fix: "Apply a 'Sieve' filter (Processing > GDAL > Raster Analysis) to remove small clusters."
      },
      {
        error: "Class Mismatch in Matrix",
        cause: "Different class IDs used in the two time periods.",
        fix: "Ensure Macroclass IDs are consistent across both classifications."
      },
      {
        error: "Shadows classified as Water",
        cause: "Similar spectral signatures between deep shadow and water.",
        fix: "Add more training samples for 'Shadow' and 'Water' to help the algorithm distinguish."
      }
    ]
  },
  {
    id: 15,
    cat: "agriculture",
    icon: "🌾",
    color: "rgba(245,197,66,0.15)",
    title: "Soil Erosion Mapping with GIS",
    desc: "Predicting and mapping soil erosion risk areas.",
    tags: ["Erosion", "RUSLE", "DEM", "Soil"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "SAGA GIS", "RUSLE Model", "SRTM DEM"],
    steps: [
      "Download DEM (SRTM), rainfall data (CHIRPS), soil data (FAO Soils), and land cover (ESA CCI).",
      "Compute Slope and Flow Length in SAGA to derive LS-factor (topographic factor).",
      "Compute R-factor (rainfall erosivity) from CHIRPS monthly precipitation using Python/Raster Calc.",
      "Assign K-factor (soil erodibility) values from the HWSD soil database.",
      "Assign C-factor (cover management) from land cover classification.",
      "Assign P-factor (support practice) based on land use type.",
      "Apply RUSLE equation: A = R × K × LS × C × P in Raster Calculator.",
      "Classify erosion risk levels and visualize on map."
    ],
    datasets: [
      { name: "FAO Harmonized World Soil Database", url: "https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/harmonized-world-soil-database-v12/en/" },
      { name: "CHIRPS Rainfall Erosivity", url: "https://www.chc.ucsb.edu/data/chirps" },
      { name: "ESA CCI Land Cover", url: "https://www.esa-landcover-cci.org" },
      { name: "SRTM 30m DEM", url: "https://earthexplorer.usgs.gov" }
    ],
    plugins: [
      {
        name: "Raster Tracer",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Raster Tracer'", "Install"],
        menuPath: "Vector > Raster Tracer"
      }
    ],
    commonErrors: [
      {
        error: "Extremely high erosion values",
        cause: "Incorrect units in LS-factor or R-factor calculation.",
        fix: "Double check RUSLE formula constants and ensure DEM units are in meters."
      },
      {
        error: "C-factor values missing",
        cause: "Land cover classes not mapped to RUSLE coefficients.",
        fix: "Create a lookup table (CSV) mapping Land Cover IDs to C-factors and use 'Reclassify' tool."
      },
      {
        error: "No Data in result",
        cause: "Any input raster has NoData at that pixel.",
        fix: "Ensure all input rasters are clipped to the exact same extent and have NoData handled."
      }
    ]
  },
  {
    id: 16,
    cat: "agriculture",
    icon: "🚜",
    color: "rgba(34,197,94,0.15)",
    title: "GIS and Agricultural Productivity",
    desc: "Spatial analysis of crop yields, irrigation patterns, and land suitability.",
    tags: ["Agriculture", "NDVI", "Crop Yield", "Suitability"],
    difficulty: "Intermediate",
    estimatedTime: "~12 hours",
    tools: ["QGIS", "Google Earth Engine", "FAO Data", "MODIS"],
    steps: [
      "Download MODIS NDVI time-series data from LP DAAC or via GEE.",
      "Import NDVI rasters for growing season months into QGIS.",
      "Compute seasonal NDVI mean using Raster Calculator or Time Series Manager plugin.",
      "Download crop mask / agricultural land use data from GLAM or FAO.",
      "Mask NDVI to agricultural areas only.",
      "Correlate NDVI trends with crop yield statistics from national databases.",
      "Run Land Suitability Analysis: overlay slope, soil, rainfall, temperature layers.",
      "Map irrigation coverage using canal network and surface water layers."
    ],
    datasets: [
      { name: "MODIS NDVI (MOD13A3)", url: "https://lpdaac.usgs.gov/products/mod13a3v006/" },
      { name: "FAO GeoNetwork Crop Data", url: "https://www.fao.org/geonetwork" },
      { name: "GLAM Crop Monitoring", url: "https://glam1.gsfc.nasa.gov" },
      { name: "GAEZ Land Suitability", url: "https://gaez.fao.org" }
    ],
    plugins: [
      {
        name: "Time Series Viewer",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Time Series'", "Install"],
        menuPath: "Plugins > Time Series Viewer"
      }
    ],
    commonErrors: [
      {
        error: "Cloud interference in NDVI",
        cause: "Using raw images with high cloud cover.",
        fix: "Use MODIS composite products (e.g., MOD13) or cloud-masking algorithms in GEE."
      },
      {
        error: "Zonal Stats returning Null",
        cause: "Polygon layers (fields) smaller than raster pixel size.",
        fix: "Use higher resolution imagery (Sentinel-2 10m) for small farm analysis."
      },
      {
        error: "Incorrect Correlation",
        cause: "Comparing peak NDVI with end-of-season yield.",
        fix: "Ensure the NDVI mean is calculated specifically for the growing season (start of season to peak)."
      }
    ]
  },
  {
    id: 17,
    cat: "water",
    icon: "🏔️",
    color: "rgba(14,165,233,0.15)",
    title: "Groundwater Mapping Using GIS",
    desc: "Analyzing groundwater quality and distribution using GIS.",
    tags: ["Groundwater", "Aquifer", "Interpolation", "Water Quality"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "SAGA GIS", "Python (scipy)", "WHO Data"],
    steps: [
      "Collect borehole/well data including coordinates, depth, and water quality metrics.",
      "Import well data as a CSV with lat/lon into QGIS.",
      "Download geological maps and hydrogeological data from national surveys.",
      "Run Kriging or IDW interpolation on water quality parameters.",
      "Overlay with recharge zones, land use, and soil permeability layers.",
      "Identify potential contamination sources using proximity analysis (buffer around industries, farms).",
      "Compute a groundwater vulnerability index using DRASTIC model parameters.",
      "Export a groundwater potential/vulnerability map."
    ],
    datasets: [
      { name: "IGRAC Global Groundwater Data", url: "https://www.un-igrac.org/special-project/ggis" },
      { name: "WHYMAP Groundwater Resources", url: "https://www.whymap.org" },
      { name: "FAO AQUASTAT", url: "https://www.fao.org/aquastat/en/" },
      { name: "USGS National Water Information System", url: "https://waterdata.usgs.gov" }
    ],
    plugins: [
      {
        name: "Smart-Map",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Smart-Map'", "Install"],
        menuPath: "Plugins > Smart-Map"
      }
    ],
    commonErrors: [
      {
        error: "Kriging failing",
        cause: "Not enough data points or poor spatial distribution.",
        fix: "Requires at least 30-50 points for reliable Kriging; otherwise use IDW."
      },
      {
        error: "Geology Join Failed",
        cause: "Well points outside the boundary of the geology shapefile.",
        fix: "Check for projection offsets or verify spatial extent of your geology map."
      },
      {
        error: "Vulnerability Index Overflow",
        cause: "Weights in DRASTIC model not normalized.",
        fix: "Ensure the DRASTIC sum is scaled appropriately (usually 1-200 or 0-1)."
      }
    ]
  },
  {
    id: 18,
    cat: "social",
    icon: "🏛️",
    color: "rgba(168,85,247,0.15)",
    title: "GIS and Archaeological Site Mapping",
    desc: "Using spatial analysis to uncover and protect historical sites.",
    tags: ["Archaeology", "Predictive Model", "Heritage", "LiDAR"],
    difficulty: "Advanced",
    estimatedTime: "~2 days",
    tools: ["QGIS", "LiDAR data", "SAGA GIS", "R"],
    steps: [
      "Download LiDAR or high-resolution DEM data for the study area.",
      "Process LiDAR using SAGA to generate hillshade, slope, and aspect maps.",
      "Apply LiDAR visualization techniques (Sky View Factor, Local Relief Model) to detect anomalies.",
      "Import known archaeological site locations from heritage databases.",
      "Analyze environmental characteristics of known sites (elevation, proximity to water).",
      "Build a predictive model using logistic regression or Random Forest in R/Python.",
      "Map archaeological site potential across the study region.",
      "Overlay with current land use and threat maps to prioritize conservation."
    ],
    datasets: [
      { name: "OpenTopography LiDAR Data", url: "https://opentopography.org" },
      { name: "ALOS DEM", url: "https://www.eorc.jaxa.jp/ALOS/en/aw3d30/" },
      { name: "UNESCO World Heritage Sites", url: "https://whc.unesco.org/en/syndication" },
      { name: "Europeana Heritage Data (Europe)", url: "https://www.europeana.eu" }
    ],
    plugins: [
      {
        name: "Relief Visualization Toolbox (RVT)",
        installSteps: ["External download", "Add to Processing Toolbox"],
        menuPath: "Processing Toolbox > RVT"
      }
    ],
    commonErrors: [
      {
        error: "LiDAR points missing elevation",
        cause: "Raw LAS file not classified correctly.",
        fix: "Use 'LAStools' or 'PDAL' to classify ground points before generating DEM."
      },
      {
        error: "Sky View Factor looks black",
        cause: "Search radius too small for terrain features.",
        fix: "Increase the search radius in RVT settings (try 10-20 pixels)."
      },
      {
        error: "False Positives in Prediction",
        cause: "Model overfitting to limited site locations.",
        fix: "Add 'negative' samples (points where sites are known to be absent) to balance training."
      }
    ]
  },
  {
    id: 19,
    cat: "social",
    icon: "📊",
    color: "rgba(249,115,22,0.15)",
    title: "Mapping Socio-Economic Inequality",
    desc: "Using GIS to visualize economic disparities across different regions.",
    tags: ["Inequality", "Census", "Choropleth", "Social"],
    difficulty: "Intermediate",
    estimatedTime: "~8 hours",
    tools: ["QGIS", "WorldBank Data", "Census Data", "Python"],
    steps: [
      "Download administrative boundary shapefiles and census data (income, education, health).",
      "Load shapefiles into QGIS and join tabular census data via Layer Properties > Joins.",
      "Calculate inequality indices (Gini coefficient) per region using Python or Field Calculator.",
      "Create choropleth maps with graduated color schemes for each indicator.",
      "Perform spatial autocorrelation analysis (Moran's I) using the Geoda plugin or Python.",
      "Identify spatial clusters of high/low inequality using LISA statistics.",
      "Overlay with infrastructure access layers (healthcare, schools, roads).",
      "Generate an equity atlas with multiple indicators."
    ],
    datasets: [
      { name: "WorldBank Open Data", url: "https://data.worldbank.org" },
      { name: "HDX Humanitarian Data Exchange", url: "https://data.humdata.org" },
      { name: "WorldPop Demographics", url: "https://www.worldpop.org" },
      { name: "IPUMS Census Microdata", url: "https://international.ipums.org" }
    ],
    plugins: [
      {
        name: "Data Plotly",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Data Plotly'", "Install"],
        menuPath: "Plugins > Data Plotly"
      }
    ],
    commonErrors: [
      {
        error: "Modifiable Areal Unit Problem (MAUP)",
        cause: "Results change significantly when aggregating at different scales (city vs district).",
        fix: "Report results at multiple scales or use point-based population grids for validation."
      },
      {
        error: "Join Resulting in NULLs",
        cause: "Data type mismatch (e.g., ID as String in CSV, but Integer in Shapefile).",
        fix: "Change column types in CSV header or use 'Refactor Fields' tool in QGIS."
      },
      {
        error: "Color Ramp misleading",
        cause: "Using linear scale for highly skewed data.",
        fix: "Use 'Natural Breaks (Jenks)' or 'Quantile' classification for choropleth maps."
      }
    ]
  },
  {
    id: 20,
    cat: "social",
    icon: "🏺",
    color: "rgba(245,197,66,0.15)",
    title: "GIS for Cultural Heritage Preservation",
    desc: "Mapping and preserving cultural heritage sites.",
    tags: ["Heritage", "Risk", "Documentation", "Buffer"],
    difficulty: "Beginner",
    estimatedTime: "~4 hours",
    tools: ["QGIS", "OpenStreetMap", "UAV imagery", "Google Street View"],
    steps: [
      "Compile heritage site inventory with GPS coordinates and condition data.",
      "Import point/polygon data into QGIS and attribute with heritage classification.",
      "Download land use, development, and zoning layers from local government.",
      "Identify threats: compute buffers around sites and overlay with development zones.",
      "Use change detection on historic imagery vs current to identify site alterations.",
      "Run hazard overlay: flood, fire, landslide risk vs heritage site locations.",
      "Assess site visibility and access using viewshed analysis.",
      "Generate heritage conservation priority map for planning authorities."
    ],
    datasets: [
      { name: "UNESCO World Heritage List", url: "https://whc.unesco.org/en/list/" },
      { name: "OSM Heritage Features", url: "https://wiki.openstreetmap.org/wiki/Key:historic" },
      { name: "Google Earth Historical Imagery", url: "https://earth.google.com/web/" },
      { name: "National Heritage Databases (local)", url: "https://openheritage3d.org" }
    ],
    plugins: [
      {
        name: "Visibility Analysis",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Visibility'", "Install"],
        menuPath: "Processing Toolbox > Visibility Analysis"
      }
    ],
    commonErrors: [
      {
        error: "Site Location Accuracy",
        cause: "GPS points from public databases may be generalized for security.",
        fix: "Cross-reference with high-res aerial imagery to pin-point exact site boundaries."
      },
      {
        error: "Viewshed not accounting for vegetation",
        cause: "Using a DTM (Bare earth) instead of a DSM (Surfaces with trees/buildings).",
        fix: "Use a DSM for viewshed analysis to include obstacles like trees and structures."
      },
      {
        error: "Attribute Table encoding error",
        cause: "Non-UTF-8 characters in site names.",
        fix: "Save CSV as UTF-8 or change QGIS data source encoding to UTF-8."
      }
    ]
  },
  {
    id: 21,
    cat: "health",
    icon: "🔍",
    color: "rgba(239,68,68,0.15)",
    title: "GIS in Crime Pattern Analysis",
    desc: "Mapping crime hotspots for law enforcement and public safety.",
    tags: ["Crime", "Hotspot", "KDE", "Public Safety"],
    difficulty: "Beginner",
    estimatedTime: "~5 hours",
    tools: ["QGIS", "Kernel Density", "Python", "Crime Stats"],
    steps: [
      "Obtain crime incident data as CSV or shapefile from local police open data portals.",
      "Import data into QGIS and display as point layer.",
      "Perform Kernel Density Estimation (Heatmap) to identify hotspot areas.",
      "Use the DBSCAN clustering algorithm (via Python/QGIS plugin) for crime cluster detection.",
      "Overlay hotspots with street network, lighting, and demographic data.",
      "Analyze temporal patterns by filtering data by time of day/week.",
      "Compute near repeat victimization distances using the Near Repeat plugin.",
      "Generate crime risk zones map for patrol optimization."
    ],
    datasets: [
      { name: "Open Crime Data by City (Police Dept)", url: "https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2" },
      { name: "UK Crime Data", url: "https://data.police.uk/data/" },
      { name: "OSM Street Network", url: "https://download.geofabrik.de" },
      { name: "Social Explorer Census Data", url: "https://www.socialexplorer.com" }
    ],
    plugins: [
      {
        name: "Online Routing Mapper",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Routing'", "Install"],
        menuPath: "Plugins > Routing"
      }
    ],
    commonErrors: [
      {
        error: "Over-smoothing in Heatmap",
        cause: "Search radius set too high, making the whole city look like a hotspot.",
        fix: "Use a smaller radius (e.g., 200m-500m) for localized urban crime analysis."
      },
      {
        error: "Time-of-day attribute lost",
        cause: "Importing CSV without specifying the date/time format.",
        fix: "Ensure the time column is recognized as 'DateTime' in the import settings."
      },
      {
        error: "Points stacked at one location",
        cause: "Privacy masking: all crimes in a block assigned to one center point.",
        fix: "Use 'Randomize Points' or 'Point Displacement' to see individual incidents."
      }
    ]
  },
  {
    id: 22,
    cat: "urban",
    icon: "📈",
    color: "rgba(139,92,246,0.15)",
    title: "Urban Growth and Sprawl Analysis with GIS",
    desc: "Tracking and analyzing urbanization trends.",
    tags: ["Urban Sprawl", "Change Detection", "GHSL", "Growth"],
    difficulty: "Intermediate",
    estimatedTime: "~10 hours",
    tools: ["QGIS", "GHSL", "Landsat", "SCP Plugin"],
    steps: [
      "Download multi-temporal Landsat imagery (1990, 2000, 2010, 2020) from EarthExplorer.",
      "Classify each image as 'Urban' vs 'Non-Urban' using supervised classification in SCP.",
      "Compute urban area statistics per time period using Field Calculator.",
      "Create a growth animation using QGIS Temporal Controller.",
      "Download GHSL built-up area data for validation and comparison.",
      "Calculate sprawl metrics: compactness, fragmentation using Fragstats or Python.",
      "Overlay with population data to compute per-capita urban land consumption.",
      "Map growth direction and identify future expansion corridors."
    ],
    datasets: [
      { name: "Global Human Settlement Layer (GHSL)", url: "https://ghsl.jrc.ec.europa.eu/download.php" },
      { name: "USGS EarthExplorer Landsat", url: "https://earthexplorer.usgs.gov" },
      { name: "GHS Urban Centre Database", url: "https://ghsl.jrc.ec.europa.eu/ghs_stat_ucdb2015mt_r2019a.php" },
      { name: "ESA Urban Atlas", url: "https://land.copernicus.eu/local/urban-atlas" }
    ],
    plugins: [
      {
        name: "LULC Classifier",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'LULC'", "Install"],
        menuPath: "Plugins > LULC"
      }
    ],
    commonErrors: [
      {
        error: "Underestimating Growth",
        cause: "Clouds in imagery covering expanding peri-urban areas.",
        fix: "Use 'Cloud Masking' and multi-image composites (Mean/Median) for each time period."
      },
      {
        error: "Inconsistent Pixels",
        cause: "Comparing Landsat (30m) with Sentinel-2 (10m) without resampling.",
        fix: "Resample all layers to a common resolution (e.g., 30m) before subtraction."
      },
      {
        error: "Administrative boundary changes",
        cause: "City limits expanded over 30 years, skewing stats.",
        fix: "Use a fixed 'buffer' or 'metropolitan area' boundary for all years."
      }
    ]
  },
  {
    id: 23,
    cat: "water",
    icon: "🌊",
    color: "rgba(14,165,233,0.15)",
    title: "GIS in Water Resource Management",
    desc: "Mapping and monitoring watersheds and water bodies.",
    tags: ["Watershed", "Water Bodies", "Management", "NDWI"],
    difficulty: "Intermediate",
    estimatedTime: "~12 hours",
    tools: ["QGIS", "HydroSHEDS", "Sentinel-2", "SAGA GIS"],
    steps: [
      "Download HydroSHEDS watershed boundaries and river network data.",
      "Load Sentinel-2 imagery and compute NDWI (Normalized Difference Water Index).",
      "Threshold NDWI to extract water body extent as a raster.",
      "Vectorize the water raster and calculate water body area and perimeter.",
      "Compare multi-temporal NDWI to detect seasonal or long-term water level changes.",
      "Overlay watershed boundaries with precipitation and evaporation data.",
      "Compute runoff potential using the SCS-CN method in QGIS.",
      "Map water stress zones by overlaying demand data with supply estimates."
    ],
    datasets: [
      { name: "HydroSHEDS River Network", url: "https://www.hydrosheds.org/downloads" },
      { name: "JRC Global Surface Water", url: "https://global-surface-water.appspot.com" },
      { name: "Copernicus Sentinel-2", url: "https://scihub.copernicus.eu" },
      { name: "AQUASTAT Water Resources", url: "https://www.fao.org/aquastat/en/" }
    ],
    plugins: [
      {
        name: "Acclimatize",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Acclimatize'", "Install"],
        menuPath: "Plugins > Acclimatize"
      }
    ],
    commonErrors: [
      {
        error: "NDWI picking up Snow",
        cause: "Snow has a high NDWI signature similar to water.",
        fix: "Use the MNDWI (Modified NDWI) with the SWIR band to better separate snow/ice from water."
      },
      {
        error: "Disconnected River Network",
        cause: "HydroSHEDS gaps or resolution too low for small streams.",
        fix: "Use 'SAGA's Burn Stream Network' to force the DEM to follow known river paths."
      },
      {
        error: "Overestimation of Runoff",
        cause: "Incorrect Curve Number (CN) assigned to urban land use.",
        fix: "Verify CN values from standard USDA tables and adjust for local soil conditions."
      }
    ]
  },
  {
    id: 24,
    cat: "remote",
    icon: "🌿",
    color: "rgba(74,222,128,0.15)",
    title: "Remote Sensing for Deforestation Monitoring",
    desc: "Assessing deforestation trends and impacts using satellite data.",
    tags: ["Deforestation", "SAR", "Sentinel-1", "Forest Cover"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "SNAP", "Google Earth Engine", "Global Forest Watch"],
    steps: [
      "Create a Global Forest Watch account and explore the forest change data portal.",
      "Download Hansen Global Forest Change data (gain/loss layers) for your region.",
      "Load GFC rasters into QGIS: tree cover, loss year, and gain layers.",
      "Use Raster Calculator to isolate forest loss by specific year.",
      "Download Sentinel-1 SAR data from Copernicus Hub for cloud-penetrating analysis.",
      "Process SAR data in SNAP (Sentinel Application Platform): calibrate, speckle filter, terrain correct.",
      "Import processed SAR to QGIS and compare with optical change detection.",
      "Generate deforestation timeline and annual loss statistics."
    ],
    datasets: [
      { name: "Global Forest Change (Hansen)", url: "https://earthenginepartners.appspot.com/science-2013-global-forest" },
      { name: "Global Forest Watch Data", url: "https://www.globalforestwatch.org/dashboards/global/" },
      { name: "Copernicus Sentinel-1 SAR", url: "https://scihub.copernicus.eu" },
      { name: "PRODES Amazon Deforestation (INPE)", url: "http://terrabrasilis.dpi.inpe.br" }
    ],
    plugins: [
      {
        name: "Sentinel Hub",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Sentinel Hub'", "Get API Key"],
        menuPath: "Web > Sentinel Hub"
      }
    ],
    commonErrors: [
      {
        error: "SAR interpretation error",
        cause: "Radar shadow or layover in mountainous terrain.",
        fix: "Apply 'Range-Doppler Terrain Correction' in SNAP using a high-res DEM (SRTM)."
      },
      {
        error: "Loss Year layer missing data",
        cause: "Hansen data uses 0-20 to represent years (2000-2020).",
        fix: "Verify the attribute values; use Raster Calculator to select (LossYear == 20) for 2020 loss."
      },
      {
        error: "Forest definition mismatch",
        cause: "Using 10% canopy cover vs 30% definition.",
        fix: "Threshold the 'Tree Cover 2000' raster at >30% before analyzing loss."
      }
    ]
  },
  {
    id: 25,
    cat: "health",
    icon: "🏥",
    color: "rgba(239,68,68,0.15)",
    title: "GIS for Public Health",
    desc: "Mapping disease outbreaks and health service accessibility.",
    tags: ["Disease", "Accessibility", "Health", "Epidemiology"],
    difficulty: "Beginner",
    estimatedTime: "~6 hours",
    tools: ["QGIS", "QNEAT3", "WHO Data", "OpenStreetMap"],
    steps: [
      "Download disease incidence data by administrative unit from WHO or national health ministries.",
      "Join data to admin boundary shapefiles and create choropleth disease maps.",
      "Map health facility locations (hospitals, clinics) from OSM or HSMA database.",
      "Use QNEAT3 or Road Graph plugin to compute travel time to nearest health facility.",
      "Identify areas with low healthcare access (>60 min travel time to nearest facility).",
      "Overlay with population density to estimate underserved population counts.",
      "Perform spatial cluster analysis of disease incidence (SaTScan or Kulldorff).",
      "Generate health service gap map for policy recommendations."
    ],
    datasets: [
      { name: "WHO Global Health Observatory", url: "https://www.who.int/data/gho" },
      { name: "HealthSites.io Facility Locations", url: "https://healthsites.io" },
      { name: "HDX Disease Outbreak Data", url: "https://data.humdata.org/dataset" },
      { name: "WorldPop Population Grid", url: "https://www.worldpop.org" }
    ],
    plugins: [
      {
        name: "QNEAT3",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'QNEAT3'", "Install"],
        menuPath: "Processing Toolbox > QNEAT3"
      }
    ],
    commonErrors: [
      {
        error: "Travel time is zero",
        cause: "Facilities not snapped to the road network.",
        fix: "Increase 'Entry Cost' or use the 'Snap Points to Layers' tool before running Iso-Area."
      },
      {
        error: "Population data units",
        cause: "Mixing 'Total Population' with 'Density per km2'.",
        fix: "Convert Population Grid to points and sum within catchment zones for totals."
      },
      {
        error: "Disease data suppression",
        cause: "Low counts (<5) hidden for privacy in official data.",
        fix: "Aggregate to a larger admin level (District to Province) to see patterns."
      }
    ]
  },
  {
    id: 26,
    cat: "urban",
    icon: "🚗",
    color: "rgba(139,92,246,0.15)",
    title: "Transportation Network Analysis with GIS",
    desc: "Analyzing transportation efficiency and accessibility using GIS.",
    tags: ["Transport", "Network", "Routing", "Accessibility"],
    difficulty: "Intermediate",
    estimatedTime: "~12 hours",
    tools: ["QGIS", "QNEAT3", "OSM", "pgRouting"],
    steps: [
      "Download road network data from OSM via Geofabrik or directly in QGIS using QuickOSM plugin.",
      "Load road network and build a topological network using QNEAT3 plugin.",
      "Define origin points (population centers) and destination points (jobs, services).",
      "Run Iso-Area (Isochrone) analysis to show areas reachable within X minutes.",
      "Compute Shortest Path between multiple origin-destination pairs.",
      "Analyze network connectivity: identify bottlenecks using betweenness centrality.",
      "Overlay with public transit routes and stops from GTFS data.",
      "Visualize travel time maps and highlight accessibility gaps."
    ],
    datasets: [
      { name: "OpenStreetMap Roads (Geofabrik)", url: "https://download.geofabrik.de" },
      { name: "GTFS Transit Feed Data", url: "https://transitfeeds.com" },
      { name: "Global Roads Open Access Data Set (gROADS)", url: "https://sedac.ciesin.columbia.edu/data/set/groads-global-roads-open-access-v1" },
      { name: "HERE Open Maps (roads)", url: "https://platform.here.com/portal/overview" }
    ],
    plugins: [
      {
        name: "GTFS-GO",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'GTFS'", "Install"],
        menuPath: "Vector > GTFS-GO"
      }
    ],
    commonErrors: [
      {
        error: "Routing crosses one-way streets",
        cause: "Network topology didn't account for one-way attributes.",
        fix: "Configure QNEAT3 to use the 'oneway' field from OSM attributes."
      },
      {
        error: "Graph not connected",
        cause: "Bridges or tunnels in OSM not sharing nodes with ground roads.",
        fix: "Check for 'level' or 'layer' attributes and use 'v.clean' to force snapping."
      },
      {
        error: "GTFS import failing",
        cause: "Incorrect date format in 'calendar.txt'.",
        fix: "Ensure your QGIS project date matches the service dates in the GTFS feed."
      }
    ]
  },
  {
    id: 27,
    cat: "remote",
    icon: "🛰️",
    color: "rgba(100,116,139,0.25)",
    title: "Geospatial Analysis of Renewable Energy Sites",
    desc: "Identifying suitable locations for wind farms and solar plants.",
    tags: ["Solar", "Wind", "Suitability", "Energy"],
    difficulty: "Intermediate",
    estimatedTime: "~10 hours",
    tools: ["QGIS", "PVGIS", "Global Wind Atlas", "Weighted Overlay"],
    steps: [
      "Download solar radiation data from PVGIS or Global Solar Atlas.",
      "Download wind speed data from the Global Wind Atlas.",
      "Load both rasters into QGIS and reproject to a common CRS.",
      "Define exclusion zones: protected areas, water bodies, steep slopes, urban areas.",
      "Create a binary exclusion mask using Raster Calculator.",
      "Apply weighted overlay combining solar/wind potential with land constraints.",
      "Classify output into energy suitability zones.",
      "Overlay with transmission line infrastructure and roads for site accessibility scoring."
    ],
    datasets: [
      { name: "Global Solar Atlas", url: "https://globalsolaratlas.info/download" },
      { name: "Global Wind Atlas", url: "https://globalwindatlas.info/en/download/gis-files" },
      { name: "PVGIS Solar Energy Tool", url: "https://re.jrc.ec.europa.eu/pvg_tools/en/" },
      { name: "OpenStreetMap Power Infrastructure", url: "https://download.geofabrik.de" }
    ],
    plugins: [
      {
        name: "Lat Lon Tools",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Lat Lon'", "Install"],
        menuPath: "Plugins > Lat Lon Tools"
      }
    ],
    commonErrors: [
      {
        error: "Solar Potential too low",
        cause: "Units mix-up between kWh/m2/day and kWh/m2/year.",
        fix: "Check the dataset documentation and normalize all potential values to the same unit."
      },
      {
        error: "Slope exclusion too strict",
        cause: "Degree vs Percent mismatch in slope calculation.",
        fix: "Wind turbines often use <10% slope; ensure Raster Terrain Analysis output matches your criteria."
      },
      {
        error: "Buffer too small for Power Lines",
        cause: "Not accounting for right-of-way or connection costs.",
        fix: "Use 'Proximity (Raster Distance)' to create a continuous cost surface from power lines."
      }
    ]
  },
  {
    id: 28,
    cat: "urban",
    icon: "🌳",
    color: "rgba(34,197,94,0.15)",
    title: "GIS and Green Infrastructure",
    desc: "Designing green spaces in urban environments for sustainable development.",
    tags: ["Green Space", "Urban", "NBS", "NDVI"],
    difficulty: "Beginner",
    estimatedTime: "~6 hours",
    tools: ["QGIS", "i-Tree", "NDVI", "OpenStreetMap"],
    steps: [
      "Download urban land use and green space data from OSM or city open data portals.",
      "Map existing green infrastructure: parks, street trees, green roofs.",
      "Compute NDVI from Sentinel-2 imagery to quantify vegetation coverage.",
      "Calculate green space ratio per district using Zonal Statistics.",
      "Identify green space deficits: areas with low NDVI and high population density.",
      "Run walkability analysis: distance to nearest green space per resident.",
      "Apply ecosystem service valuation using InVEST Urban module.",
      "Propose new green space locations based on suitability analysis."
    ],
    datasets: [
      { name: "Copernicus Urban Atlas Green Areas", url: "https://land.copernicus.eu/local/urban-atlas" },
      { name: "Sentinel-2 NDVI via Copernicus", url: "https://scihub.copernicus.eu" },
      { name: "OpenGreenMap Data", url: "https://opengreenmap.org" },
      { name: "i-Tree Canopy Tool", url: "https://canopy.itreetools.org" }
    ],
    plugins: [
      {
        name: "ORS Tools",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'ORS Tools'", "Get API Key from OpenRouteService"],
        menuPath: "Web > ORS Tools"
      }
    ],
    commonErrors: [
      {
        error: "Private gardens counted as public green space",
        cause: "NDVI doesn't distinguish between a public park and a private backyard.",
        fix: "Mask the NDVI results with 'Land Use' polygons to exclude private properties."
      },
      {
        error: "Accessibility over-optimistic",
        cause: "Distance calculated as 'As the crow flies' (Euclidean).",
        fix: "Use 'Network Analysis' (Isochrones) to account for fences, highways, and barriers."
      },
      {
        error: "Zonal Statistics mismatched resolution",
        cause: "District polygons smaller than 10m Sentinel pixels.",
        fix: "Use 'Zonal Statistics' with 'Weighted' option or use higher-res imagery (e.g., NAIP)."
      }
    ]
  },
  {
    id: 29,
    cat: "social",
    icon: "👥",
    color: "rgba(249,115,22,0.15)",
    title: "Spatio-Temporal Analysis of Population Growth",
    desc: "Studying population dynamics and migration trends.",
    tags: ["Population", "Migration", "Census", "Temporal"],
    difficulty: "Beginner",
    estimatedTime: "~6 hours",
    tools: ["QGIS", "WorldPop", "QGIS Temporal Controller", "Python"],
    steps: [
      "Download WorldPop population rasters for multiple years (2000, 2010, 2020).",
      "Load all rasters in QGIS and assign temporal metadata.",
      "Use the QGIS Temporal Controller to animate population change over time.",
      "Compute population change raster: Raster Calculator (Year2 – Year1).",
      "Identify high-growth zones (urban fringe) vs declining areas (rural).",
      "Download migration flow data from UN DESA or national statistics.",
      "Map migration origins and destinations using flow map (graduated line symbols).",
      "Correlate population growth with economic and infrastructure data."
    ],
    datasets: [
      { name: "WorldPop Population Counts", url: "https://www.worldpop.org/geodata/listing?id=69" },
      { name: "GHSL Population Grid", url: "https://ghsl.jrc.ec.europa.eu/ghs_pop2023.php" },
      { name: "UN World Population Prospects", url: "https://population.un.org/wpp/" },
      { name: "Census Bureau TIGER Files (USA)", url: "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html" }
    ],
    plugins: [
      {
        name: "FlowMapper",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'FlowMapper'", "Install"],
        menuPath: "Plugins > FlowMapper"
      }
    ],
    commonErrors: [
      {
        error: "Temporal animation jerky",
        cause: "Rasters not assigned to specific time steps.",
        fix: "Right-click Layer > Properties > Temporal > Enable and set start/end dates."
      },
      {
        error: "Population mismatch at borders",
        cause: "Different datasets using different coastline definitions.",
        fix: "Clip all population rasters to a standard coastal buffer layer."
      },
      {
        error: "Flow map too cluttered",
        cause: "Too many migration lines between all districts.",
        fix: "Filter flows to show only those above a certain threshold (e.g., >1000 people)."
      }
    ]
  },
  {
    id: 30,
    cat: "remote",
    icon: "🌾",
    color: "rgba(74,222,128,0.15)",
    title: "Remote Sensing for Crop Disease Monitoring",
    desc: "Detecting crop diseases through satellite imagery and GIS analysis.",
    tags: ["Crop Disease", "Hyperspectral", "NDRE", "Agriculture"],
    difficulty: "Advanced",
    estimatedTime: "~2 days",
    tools: ["QGIS", "Sentinel-2", "Planet Labs", "Python (scikit-learn)"],
    steps: [
      "Download Sentinel-2 imagery with multiple spectral bands including Red Edge.",
      "Compute vegetation indices: NDVI, NDRE, SAVI using Raster Calculator.",
      "Anomaly detection: compare current NDVI with multi-year seasonal baseline.",
      "Identify stressed areas (low NDVI relative to baseline) as potential disease zones.",
      "Validate with field survey data: import GPS points of confirmed disease cases.",
      "Train a classification model (Random Forest) using spectral signatures in Python.",
      "Apply model to classify healthy vs diseased crops across the study area.",
      "Map disease risk by field parcel and export for agronomist review."
    ],
    datasets: [
      { name: "Copernicus Sentinel-2 (Red Edge bands)", url: "https://scihub.copernicus.eu" },
      { name: "MODIS Vegetation Indices (MYD13A2)", url: "https://lpdaac.usgs.gov/products/myd13a2v006/" },
      { name: "Planet Labs (commercial, free for research)", url: "https://www.planet.com/nicfi/" },
      { name: "USDA Cropland Data Layer", url: "https://nassgeodata.gmu.edu/CropScape/" }
    ],
    plugins: [
      {
        name: "Dzetsaka Classification",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Dzetsaka'", "Install"],
        menuPath: "Processing Toolbox > Dzetsaka"
      }
    ],
    commonErrors: [
      {
        error: "Nitrogen deficiency confused with disease",
        cause: "Both cause similar spectral shifts in the red edge.",
        fix: "Compare with soil fertility maps or apply NDRE index which is more sensitive to chlorophyll."
      },
      {
        error: "Training data overfitting",
        cause: "Samples taken from only one farm or one date.",
        fix: "Use multi-temporal training data and cross-validation to ensure model robustness."
      },
      {
        error: "Atmospheric haze masking signals",
        cause: "Incomplete atmospheric correction of Sentinel-2 bands.",
        fix: "Use Sentinel-2 Level 2A (Bottom of Atmosphere) products from Copernicus."
      }
    ]
  },
  {
    id: 31,
    cat: "environment",
    icon: "🛢️",
    color: "rgba(100,116,139,0.25)",
    title: "GIS in Oil Spill Detection and Management",
    desc: "Using GIS to detect and manage oil spill impacts on the environment.",
    tags: ["Oil Spill", "SAR", "Marine", "Sentinel-1"],
    difficulty: "Advanced",
    estimatedTime: "~1.5 days",
    tools: ["QGIS", "Sentinel-1 SAR", "SNAP", "NOAA GNOME"],
    steps: [
      "Download Sentinel-1 SAR data from Copernicus Open Access Hub for the affected area.",
      "Process SAR imagery in SNAP: calibration, speckle filtering, terrain correction.",
      "Export processed SAR to QGIS as GeoTIFF.",
      "Apply thresholding on backscatter values to detect oil slick (dark patches on sea surface).",
      "Vectorize detected oil slick polygons and calculate area.",
      "Overlay with current/wind data to model drift using trajectory models (GNOME).",
      "Identify sensitive ecosystems and coastlines at risk using marine habitat maps.",
      "Map cleanup priority zones and access routes."
    ],
    datasets: [
      { name: "Copernicus Sentinel-1 SAR", url: "https://scihub.copernicus.eu" },
      { name: "NOAA Environmental Response Data", url: "https://response.restoration.noaa.gov/maps-and-spatial-data" },
      { name: "GEBCO Ocean Bathymetry", url: "https://www.gebco.net/data_and_products/gridded_bathymetry_data/" },
      { name: "Marine Regions EEZ Data", url: "https://www.marineregions.org" }
    ],
    plugins: [
      {
        name: "Processing Enabler",
        installSteps: ["Standard with SNAP install", "Connect to QGIS Processing"],
        menuPath: "Processing Toolbox > SNAP"
      }
    ],
    commonErrors: [
      {
        error: "Look-alikes (false positives)",
        cause: "Low wind areas or biogenic films look like oil on SAR.",
        fix: "Cross-reference with wind speed data (>3m/s) and known shipping lanes."
      },
      {
        error: "SAR speckle makes slicks fuzzy",
        cause: "Insufficient speckle filtering.",
        fix: "Use 'Refined Lee' or 'Gamma Map' filter in SNAP before thresholding."
      },
      {
        error: "Trajectory model offset",
        cause: "Incorrect surface current vectors.",
        fix: "Verify current data source (HYCOM or CMEMS) and ensure coordinate systems match GNOME."
      }
    ]
  },
  {
    id: 32,
    cat: "urban",
    icon: "♻️",
    color: "rgba(74,222,128,0.15)",
    title: "GIS for Solid Waste Management",
    desc: "Optimizing waste collection and disposal routes using spatial analysis.",
    tags: ["Waste", "Routing", "Network", "Optimization"],
    difficulty: "Intermediate",
    estimatedTime: "~12 hours",
    tools: ["QGIS", "QNEAT3", "OSM", "Python (OR-Tools)"],
    steps: [
      "Map waste generation sources: residential, commercial, industrial zones.",
      "Download road network from OSM using QuickOSM plugin.",
      "Map existing waste collection points and disposal sites.",
      "Build a routable network using QNEAT3 plugin.",
      "Apply Vehicle Routing Problem (VRP) optimization using Python OR-Tools.",
      "Compute optimal collection routes minimizing distance/time.",
      "Identify underserved areas lacking waste collection access.",
      "Propose new transfer station locations using weighted site selection."
    ],
    datasets: [
      { name: "OpenStreetMap Road Network", url: "https://download.geofabrik.de" },
      { name: "WorldBank Urban Waste Data", url: "https://datatopics.worldbank.org/what-a-waste/" },
      { name: "Global Waste Atlas", url: "http://globalwasteatlas.iswa.org" },
      { name: "OpenCities Africa Data", url: "https://opencitiesproject.org" }
    ],
    plugins: [
      {
        name: "QuickOSM",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'QuickOSM'", "Install"],
        menuPath: "Vector > QuickOSM"
      }
    ],
    commonErrors: [
      {
        error: "Bins located on non-routable segments",
        cause: "GPS points of bins not perfectly aligned with the road network nodes.",
        fix: "Use 'Snap Points to Layer' to move bins to the nearest road edge."
      },
      {
        error: "Network topology gaps",
        cause: "Roads in OSM have disconnected nodes at bridges/intersections.",
        fix: "Run 'Topology Checker' and fix dangles/gaps manually or with GRASS v.clean."
      },
      {
        error: "Vehicle capacity ignored",
        cause: "Routing logic only focused on distance, not truck volume.",
        fix: "Must use Python (OR-Tools) or specialized VRP plugins that support capacity constraints."
      }
    ]
  },
  {
    id: 33,
    cat: "remote",
    icon: "🌲",
    color: "rgba(34,197,94,0.15)",
    title: "Remote Sensing for Urban Vegetation Mapping",
    desc: "Mapping and monitoring urban green spaces and vegetation health.",
    tags: ["NDVI", "Urban Trees", "Sentinel-2", "Green Cover"],
    difficulty: "Intermediate",
    estimatedTime: "~8 hours",
    tools: ["QGIS", "Sentinel-2", "SCP Plugin", "OBIA"],
    steps: [
      "Download high-resolution Sentinel-2 or Aerial imagery for your city.",
      "Compute NDVI: (B8 - B4) / (B8 + B4) using Raster Calculator.",
      "Classify vegetation using Object-Based Image Analysis (OBIA) via the Orfeo Toolbox plugin.",
      "Distinguish tree canopy, grass, shrubs, and bare soil classes.",
      "Calculate per-district green coverage percentages with Zonal Statistics.",
      "Detect vegetation loss/gain by comparing with previous year imagery.",
      "Map urban tree canopy using LiDAR or DSM-DTM difference (CHM).",
      "Identify heat island areas with low vegetation for greening prioritization."
    ],
    datasets: [
      { name: "Copernicus Sentinel-2", url: "https://scihub.copernicus.eu" },
      { name: "Urban Atlas Green Urban Areas", url: "https://land.copernicus.eu/local/urban-atlas" },
      { name: "OpenTreeMap", url: "https://www.opentreemap.org" },
      { name: "City Open Data Portals (local tree inventory)", url: "https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35" }
    ],
    plugins: [
      {
        name: "Orfeo Toolbox (OTB) Provider",
        installSteps: ["External OTB install", "Enable in Processing Toolbox"],
        menuPath: "Processing Toolbox > OTB"
      }
    ],
    commonErrors: [
      {
        error: "Shadows confused with trees",
        cause: "Buildings casting shadows that lower the NDVI signal.",
        fix: "Use 'Brightness' or 'Mean Intensity' as an extra feature in OBIA to separate shadows."
      },
      {
        error: "Canopy height error",
        cause: "Using DSM as DTM or vice versa.",
        fix: "Ensure CHM = DSM - DTM; check that both have the same vertical units (meters)."
      },
      {
        error: "Segmentation too coarse",
        cause: "OTB MeanShift parameters (Spatial/Range radius) set too high.",
        fix: "Lower the radii to 5-10 to capture individual small tree clusters in urban blocks."
      }
    ]
  },
  {
    id: 34,
    cat: "environment",
    icon: "🐠",
    color: "rgba(14,165,233,0.15)",
    title: "GIS for Coastal Zone Management",
    desc: "Assessing erosion, flooding, and habitat changes in coastal areas.",
    tags: ["Coastal", "Erosion", "Mangrove", "Sea Level"],
    difficulty: "Intermediate",
    estimatedTime: "~1 day",
    tools: ["QGIS", "CoastalDEM", "Sentinel-2", "SNAP"],
    steps: [
      "Download a high-accuracy coastal DEM (CoastalDEM or LIDAR from national agencies).",
      "Map current shoreline using Sentinel-2 NIR band thresholding or NDWI.",
      "Obtain historical shoreline data from USGS Digital Shoreline Analysis System (DSAS).",
      "Install the DSAS plugin in QGIS and compute rates of shoreline change.",
      "Map coastal habitats: mangroves, seagrass, coral reefs using supervised classification.",
      "Model sea level rise inundation scenarios using Raster Calculator (DEM < 0.5m, 1m, 2m).",
      "Overlay with coastal infrastructure and population data for vulnerability assessment.",
      "Generate coastal risk atlas and export."
    ],
    datasets: [
      { name: "CoastalDEM (Climate Central)", url: "https://www.climatecentral.org/coastaldem" },
      { name: "USGS DSAS Shoreline Data", url: "https://www.usgs.gov/centers/whcmsc/science/digital-shoreline-analysis-system" },
      { name: "Global Mangrove Watch", url: "https://www.globalmangrovewatch.org" },
      { name: "Copernicus Sentinel-2", url: "https://scihub.copernicus.eu" }
    ],
    plugins: [
      {
        name: "Semi-Automatic Classification Plugin",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'SCP'", "Install"],
        menuPath: "SCP > Classification"
      }
    ],
    commonErrors: [
      {
        error: "Inundation 'Leaking'",
        cause: "Low inland areas not connected to the sea being shown as flooded.",
        fix: "Use 'Connected Components' or 'Flood Fill' algorithm to only show areas with sea access."
      },
      {
        error: "Tide Level Mismatch",
        cause: "Satellite image taken at high tide being compared to low tide shoreline.",
        fix: "Check acquisition time and local tide tables; try to use images from similar tide stages."
      },
      {
        error: "DEM Accuracy",
        cause: "SRTM overestimating elevation in mangrove forests (canopy top, not ground).",
        fix: "Use 'CoastalDEM' or LIDAR-derived DEMs which correct for vegetation bias."
      }
    ]
  },
  {
    id: 35,
    cat: "remote",
    icon: "📡",
    color: "rgba(100,116,139,0.25)",
    title: "Multispectral vs Hyperspectral Imaging for Land Use",
    desc: "Comparing the utility of multispectral and hyperspectral imaging.",
    tags: ["Hyperspectral", "Multispectral", "Classification", "Land Use"],
    difficulty: "Advanced",
    estimatedTime: "~2 days",
    tools: ["QGIS", "ENVI", "Python (spectral)", "PRISMA Data"],
    steps: [
      "Download Sentinel-2 (multispectral, 13 bands) and PRISMA (hyperspectral, 239 bands) data.",
      "Load both datasets into QGIS and compare visual appearance.",
      "Perform supervised classification on Sentinel-2 using SCP plugin.",
      "Process hyperspectral data in QGIS or Python (spectral library) — apply PCA to reduce dimensions.",
      "Classify hyperspectral data using SAM (Spectral Angle Mapper) algorithm.",
      "Compare classification accuracy: generate confusion matrices for both.",
      "Assess specific land use discrimination: e.g. crop types, mineral detection.",
      "Document where hyperspectral outperforms multispectral and vice versa."
    ],
    datasets: [
      { name: "Copernicus Sentinel-2 (Multispectral)", url: "https://scihub.copernicus.eu" },
      { name: "PRISMA Hyperspectral (ASI - Italy)", url: "https://prisma.asi.it" },
      { name: "AVIRIS Hyperspectral Data (NASA)", url: "https://aviris.jpl.nasa.gov/dataportal/" },
      { name: "USGS Spectral Library", url: "https://crustal.usgs.gov/speclab/QueryAll07a.php" }
    ],
    plugins: [
      {
        name: "Spectral Library Tool",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Spectral'", "Install"],
        menuPath: "Plugins > Spectral"
      }
    ],
    commonErrors: [
      {
        error: "Hughes Phenomenon (Curse of Dimensionality)",
        cause: "Classification accuracy drops because of too many bands relative to training samples.",
        fix: "Use PCA or MNF transforms to reduce hyperspectral data to 10-20 principal components."
      },
      {
        error: "PRISMA file format (HDF5) not opening",
        cause: "Standard raster loader doesn't recognize hyperspectral stacks.",
        fix: "Use 'Add Mesh Layer' or a custom Python script using 'h5py' to stack bands into a TIF."
      },
      {
        error: "Atmospheric Absorption Bands",
        cause: "Water vapor bands (e.g., around 1400nm) causing noise.",
        fix: "Identify and remove 'bad bands' corresponding to atmospheric absorption before classification."
      }
    ]
  },
  {
    id: 36,
    cat: "remote",
    icon: "🔢",
    color: "rgba(168,85,247,0.15)",
    title: "Geospatial Data Mining for Predictive Analysis",
    desc: "Extracting valuable patterns from large geospatial datasets.",
    tags: ["Data Mining", "ML", "Big Data", "Pattern Recognition"],
    difficulty: "Advanced",
    estimatedTime: "~2.5 days",
    tools: ["QGIS", "Python (sklearn)", "Google Earth Engine", "PostGIS"],
    steps: [
      "Identify a geospatial prediction task (e.g., predicting flood-prone areas, crop yield).",
      "Collect multi-source training data: satellite bands, terrain, climate, socio-economic layers.",
      "Export all rasters to consistent resolution and CRS using QGIS Warp tool.",
      "Use Python (rasterio + numpy) to stack rasters into a multi-band array.",
      "Extract pixel-level feature vectors paired with known labels.",
      "Train a Random Forest or XGBoost model using scikit-learn.",
      "Apply model to predict across the entire study area.",
      "Import prediction raster back into QGIS and visualize results."
    ],
    datasets: [
      { name: "Google Earth Engine Data Catalog", url: "https://developers.google.com/earth-engine/datasets" },
      { name: "Multi-resolution Land Characteristics (MRLC)", url: "https://www.mrlc.gov" },
      { name: "Copernicus Data Space Ecosystem", url: "https://dataspace.copernicus.eu" },
      { name: "Microsoft Planetary Computer", url: "https://planetarycomputer.microsoft.com" }
    ],
    plugins: [
      {
        name: "EnMAP-Box",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'EnMAP'", "Install"],
        menuPath: "Plugins > EnMAP-Box"
      }
    ],
    commonErrors: [
      {
        error: "Spatial Autocorrelation",
        cause: "Training and test samples too close together, leading to inflated accuracy.",
        fix: "Use 'Spatial Cross-Validation' (leave-one-block-out) instead of random splits."
      },
      {
        error: "Feature Scale Mismatch",
        cause: "Elevation (0-8000) dominating NDVI (0-1) in distance-based models (SVM/kNN).",
        fix: "Standardize all features using 'StandardScaler' or 'MinMaxScaler' in scikit-learn."
      },
      {
        error: "Memory Leak in Prediction",
        cause: "Attempting to predict on a massive multi-band raster all at once.",
        fix: "Process the prediction in blocks/tiles using Python generators or 'rasterio' windows."
      }
    ]
  },
  {
    id: 37,
    cat: "environment",
    icon: "🌍",
    color: "rgba(34,197,94,0.15)",
    title: "GIS in Renewable Energy Resource Monitoring",
    desc: "Tracking the sustainability of forests, fisheries, and agriculture.",
    tags: ["Renewable", "Forest", "Fisheries", "Sustainability"],
    difficulty: "Intermediate",
    estimatedTime: "~12 hours",
    tools: ["QGIS", "Global Forest Watch", "FAO", "MODIS"],
    steps: [
      "Download forest cover data from Global Forest Watch or Hansen GFC.",
      "Compute forest cover percentage per administrative unit using Zonal Statistics.",
      "Monitor deforestation vs afforestation rates using multi-year NDVI trends.",
      "Download fisheries data from FAO FishStatJ for marine area analysis.",
      "Map exclusive economic zones (EEZ) using Marine Regions data.",
      "Overlay fishing effort rasters with fish stock depletion risk zones.",
      "Monitor agricultural land productivity using MODIS GPP (gross primary productivity).",
      "Generate a sustainability dashboard map showing resource stress indicators."
    ],
    datasets: [
      { name: "Global Forest Watch", url: "https://www.globalforestwatch.org" },
      { name: "FAO FishStatJ Fisheries", url: "https://www.fao.org/fishery/statistics/software/fishstatj/en" },
      { name: "MODIS GPP (MOD17A3)", url: "https://lpdaac.usgs.gov/products/mod17a3hgfv006/" },
      { name: "Marine Regions EEZ", url: "https://www.marineregions.org" }
    ],
    plugins: [
      {
        name: "Zonal Statistics",
        installSteps: ["Core Plugin", "Enable in Processing Toolbox"],
        menuPath: "Raster > Zonal Statistics"
      }
    ],
    commonErrors: [
      {
        error: "Fishing effort map look empty",
        cause: "Vessel monitoring data only available for large commercial ships.",
        fix: "Acknowledge limitations regarding artisanal fishing or use night-time light data (VIIRS)."
      },
      {
        error: "Admin Join missing rows",
        cause: "Admin polygons have slivers or gaps.",
        fix: "Clean vector topology using 'v.clean' to ensure all points/rasters are correctly assigned."
      },
      {
        error: "GPP data scale factor",
        cause: "MODIS GPP values stored as integers with a 0.0001 scale factor.",
        fix: "Multiply raw raster values by the scale factor (0.0001) in Raster Calculator."
      }
    ]
  },
  {
    id: 38,
    cat: "urban",
    icon: "📦",
    color: "rgba(245,197,66,0.15)",
    title: "GIS in Supply Chain Management",
    desc: "Optimizing supply chain routes and logistics using spatial data.",
    tags: ["Logistics", "Routing", "Network", "Supply Chain"],
    difficulty: "Intermediate",
    estimatedTime: "~10 hours",
    tools: ["QGIS", "QNEAT3", "OSM", "Python (OR-Tools)"],
    steps: [
      "Map supply chain nodes: suppliers, warehouses, distribution centers, retail points.",
      "Download road network for the logistics region from OSM.",
      "Build a routable network in QGIS using QNEAT3.",
      "Define origin-destination pairs for delivery routes.",
      "Compute shortest/fastest paths using Dijkstra algorithm in QNEAT3.",
      "Solve Vehicle Routing Problem using Python OR-Tools for fleet optimization.",
      "Analyze last-mile delivery coverage and identify underserved zones.",
      "Integrate real-time traffic data via HERE API for live routing updates."
    ],
    datasets: [
      { name: "OpenStreetMap Road Network", url: "https://download.geofabrik.de" },
      { name: "World Port Index (NOAA)", url: "https://msi.nga.mil/Publications/WPI" },
      { name: "OpenAirportData", url: "https://ourairports.com/data/" },
      { name: "UN Comtrade Trade Flow Data", url: "https://comtradeplus.un.org" }
    ],
    plugins: [
      {
        name: "Hqgis",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Hqgis'", "Get HERE API Key"],
        menuPath: "Web > Hqgis"
      }
    ],
    commonErrors: [
      {
        error: "Distance Matrix too large",
        cause: "Calculating N x N distances for thousands of points.",
        fix: "Cluster points first and solve routing within clusters to reduce complexity."
      },
      {
        error: "Bridge/Tunnel Routing Error",
        cause: "OSM levels not respected in the routing graph.",
        fix: "Ensure the QNEAT3 graph builder uses 'level' as a topological constraint."
      },
      {
        error: "Incorrect Weighting",
        cause: "Optimizing for distance when 'Time' (based on speed limits) is needed.",
        fix: "Calculate 'Travel Time' = Distance / Speed and use that as the cost attribute in the graph."
      }
    ]
  },
  {
    id: 39,
    cat: "remote",
    icon: "💧",
    color: "rgba(14,165,233,0.15)",
    title: "Remote Sensing for Soil Moisture Monitoring",
    desc: "Analyzing soil moisture levels for drought prediction and water management.",
    tags: ["Soil Moisture", "SAR", "SMAP", "Drought"],
    difficulty: "Advanced",
    estimatedTime: "~2 days",
    tools: ["QGIS", "SMAP Data", "Sentinel-1", "SNAP"],
    steps: [
      "Download NASA SMAP (Soil Moisture Active Passive) L3 data from NSIDC.",
      "Load SMAP HDF5 files using the QGIS GDAL HDF driver or convert via Python (h5py).",
      "Clip soil moisture raster to study area extent.",
      "Download Sentinel-1 SAR data for higher-resolution soil moisture retrieval.",
      "Process Sentinel-1 in SNAP and apply change detection backscatter analysis.",
      "Correlate SMAP soil moisture with Sentinel-1 backscatter for downscaling.",
      "Compare soil moisture maps with rainfall data (CHIRPS) and land use.",
      "Generate drought monitoring map showing moisture deficit zones."
    ],
    datasets: [
      { name: "NASA SMAP Soil Moisture", url: "https://nsidc.org/data/smap" },
      { name: "ESA CCI Soil Moisture", url: "https://www.esa-soilmoisture-cci.org" },
      { name: "Copernicus Sentinel-1 SAR", url: "https://scihub.copernicus.eu" },
      { name: "CHIRPS Rainfall", url: "https://www.chc.ucsb.edu/data/chirps" }
    ],
    plugins: [
      {
        name: "Sentinel Hub",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Sentinel Hub'", "Install"],
        menuPath: "Web > Sentinel Hub"
      }
    ],
    commonErrors: [
      {
        error: "Radio Frequency Interference (RFI)",
        cause: "Ground-based radar interfering with satellite passive microwave sensors.",
        fix: "Check SMAP 'quality flags' and mask out RFI-polluted pixels."
      },
      {
        error: "SAR sensitivity to roughness",
        cause: "Backscatter changes due to plowing/tillage, not just moisture.",
        fix: "Use 'Change Detection' relative to a dry-season baseline to isolate moisture signal."
      },
      {
        error: "Resolution Gap",
        cause: "SMAP (36km) is too coarse for field-scale analysis.",
        fix: "Use the 'SMAP-Sentinel' downscaled product (3km) available from NSIDC."
      }
    ]
  },
  {
    id: 40,
    cat: "remote",
    icon: "🤖",
    color: "rgba(168,85,247,0.15)",
    title: "GIS and Machine Learning for Spatial Predictions",
    desc: "Combining GIS with Machine Learning for predictive modeling.",
    tags: ["Machine Learning", "Random Forest", "Deep Learning", "Prediction"],
    difficulty: "Advanced",
    estimatedTime: "~3 days",
    tools: ["QGIS", "Python (sklearn, TensorFlow)", "GEE", "PostGIS"],
    steps: [
      "Define the spatial prediction task (land cover, disease risk, building detection, etc.).",
      "Prepare feature layers: convert all rasters to the same CRS, resolution, extent.",
      "Extract raster values at training sample points using QGIS Point Sampling Tool.",
      "Export to CSV and train a Random Forest or CNN model in Python.",
      "For deep learning: prepare image tiles using QGIS Tile Layer Plugin.",
      "Train a U-Net or ResNet model for semantic segmentation tasks.",
      "Apply trained model over full study area and generate prediction raster.",
      "Evaluate model accuracy and visualize results back in QGIS."
    ],
    datasets: [
      { name: "Google Earth Engine Datasets", url: "https://developers.google.com/earth-engine/datasets" },
      { name: "Microsoft Building Footprints", url: "https://github.com/microsoft/GlobalMLBuildingFootprints" },
      { name: "OpenStreetMap Training Data", url: "https://www.openstreetmap.org" },
      { name: "SpaceNet Challenge Datasets", url: "https://spacenet.ai/datasets/" }
    ],
    plugins: [
      {
        name: "Dzetsaka Classification",
        installSteps: ["Plugins > Manage and Install Plugins", "Search 'Dzetsaka'", "Install"],
        menuPath: "Processing Toolbox > Dzetsaka"
      }
    ],
    commonErrors: [
      {
        error: "Imbalanced Training Data",
        cause: "90% of samples are 'Forest', 1% are 'Urban', model ignores Urban.",
        fix: "Use 'SMOTE' (Oversampling) or 'Random Undersampling' to balance class counts."
      },
      {
        error: "No Data Leakage",
        cause: "Using the target variable (or proxies) as a feature.",
        fix: "Ensure independent variables are logically separated from the prediction target."
      },
      {
        error: "CNN input size mismatch",
        cause: "Image tiles not powers of 2 (e.g., 256x256).",
        fix: "Resize or pad your image chips before feeding them into the neural network."
      }
    ]
  }
];
