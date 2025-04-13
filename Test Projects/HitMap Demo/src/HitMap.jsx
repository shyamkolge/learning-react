import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Activity,
  Filter,
  RefreshCw,
  Clock,
  Download,
  Info,
} from "lucide-react";

const HeatmapComponent = () => {
  // More realistic API response time patterns (busier during business hours)
  const generateRealisticData = (apiName, baseValue, variance) => {
    return Array(24)
      .fill()
      .map((_, i) => {
        // More realistic pattern: higher during business hours (9-17), lower at night
        const hourFactor =
          i >= 9 && i <= 17
            ? 1.0 + Math.sin(((i - 9) * Math.PI) / 8) * 0.3 // Peak around 1-2pm
            : 0.7 + Math.random() * 0.2;

        // Add some randomness but keep within realistic boundaries
        return {
          time: `${String(i).padStart(2, "0")}:00`,
          [apiName]: Math.round(
            baseValue * hourFactor + Math.random() * variance
          ),
        };
      });
  };

  // APIs with more realistic base response times and consistent patterns
  const mockApiData = {
    apis: [
      {
        id: 1,
        name: "User Authentication API",
        environment: "AWS",
        status: "healthy",
        responseTime: 120,
        errorRate: 0.5,
        throughput: 1250,
        sla: 250,
      },
      {
        id: 2,
        name: "Payment Processing API",
        environment: "On-Premises",
        status: "warning",
        responseTime: 350,
        errorRate: 2.1,
        throughput: 890,
        sla: 400,
      },
      {
        id: 3,
        name: "Product Catalog API",
        environment: "Google Cloud",
        status: "critical",
        responseTime: 580,
        errorRate: 5.3,
        throughput: 1560,
        sla: 450,
      },
      {
        id: 4,
        name: "Order Management API",
        environment: "Azure",
        status: "healthy",
        responseTime: 145,
        errorRate: 0.8,
        throughput: 2100,
        sla: 300,
      },
      {
        id: 5,
        name: "Inventory API",
        environment: "On-Premises",
        status: "healthy",
        responseTime: 210,
        errorRate: 1.2,
        throughput: 780,
        sla: 350,
      },
    ],
  };

  // Generate realistic time series data for each API
  const responseTimeData = Array(24)
    .fill()
    .map((_, i) => {
      const hour = `${String(i).padStart(2, "0")}:00`;
      return {
        time: hour,
        "User Authentication API": generateRealisticData(
          "User Authentication API",
          120,
          40
        )[i]["User Authentication API"],
        "Payment Processing API": generateRealisticData(
          "Payment Processing API",
          350,
          80
        )[i]["Payment Processing API"],
        "Product Catalog API": generateRealisticData(
          "Product Catalog API",
          580,
          150
        )[i]["Product Catalog API"],
        "Order Management API": generateRealisticData(
          "Order Management API",
          145,
          35
        )[i]["Order Management API"],
        "Inventory API": generateRealisticData("Inventory API", 210, 50)[i][
          "Inventory API"
        ],
      };
    });

  mockApiData.responseTimeData = responseTimeData;

  // State
  const [selectedEnvironment, setSelectedEnvironment] = useState("All");
  const [timeRange, setTimeRange] = useState("24h");
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Get all unique environments for filter dropdown
  const environments = [
    "All",
    ...new Set(mockApiData.apis.map((api) => api.environment)),
  ];

  // Filter APIs based on selected environment
  const filteredApis =
    selectedEnvironment === "All"
      ? mockApiData.apis
      : mockApiData.apis.filter(
          (api) => api.environment === selectedEnvironment
        );

  // Generate heatmap data based on filtered APIs
  const heatmapData = mockApiData.responseTimeData.flatMap((dataPoint) =>
    filteredApis.map((api) => ({
      api: api.name,
      time: dataPoint.time,
      value: dataPoint[api.name],
      status: api.status,
      environment: api.environment,
      sla: api.sla,
      withinSla: dataPoint[api.name] <= api.sla,
    }))
  );

  // Calculate average response times and SLA compliance for KPI cards
  const calculateMetrics = () => {
    const metrics = {};

    filteredApis.forEach((api) => {
      let total = 0;
      let violationCount = 0;

      mockApiData.responseTimeData.forEach((dataPoint) => {
        const value = dataPoint[api.name];
        total += value;
        if (value > api.sla) violationCount++;
      });

      const average = Math.round(total / mockApiData.responseTimeData.length);
      const slaCompliancePercent = Math.round(
        ((mockApiData.responseTimeData.length - violationCount) /
          mockApiData.responseTimeData.length) *
          100
      );

      // Dynamic status based on average response time and SLA
      let calculatedStatus;
      if (average > api.sla * 1.25) calculatedStatus = "critical";
      else if (average > api.sla * 0.9) calculatedStatus = "warning";
      else calculatedStatus = "healthy";

      metrics[api.name] = {
        name: api.name,
        average,
        sla: api.sla,
        slaCompliancePercent,
        status: calculatedStatus,
        environment: api.environment,
      };
    });

    return Object.values(metrics);
  };

  const apiMetrics = calculateMetrics();

  // Simulate refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRefreshTime(new Date());
      setIsLoading(false);
    }, 800);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-amber-500";
      case "healthy":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get status text color
  const getStatusTextColor = (status) => {
    switch (status) {
      case "critical":
        return "text-red-700";
      case "warning":
        return "text-amber-700";
      case "healthy":
        return "text-emerald-700";
      default:
        return "text-gray-700";
    }
  };

  // Get performance level based on value and SLA
  const getPerformanceLevel = (value, sla) => {
    if (value > sla * 1.2) return { color: "#ef4444", label: "Critical" };
    if (value > sla) return { color: "#f59e0b", label: "Warning" };
    if (value > sla * 0.8) return { color: "#0ea5e9", label: "Good" };
    return { color: "#22c55e", label: "Excellent" };
  };

  // Create heatmap grid from data
  const hours = [...new Set(heatmapData.map((item) => item.time))].sort();
  const apis = [...new Set(heatmapData.map((item) => item.api))];

  // Dimensions
  const cellHeight = 48;
  const cellWidth = 44;
  const marginLeft = 180;
  const marginTop = 40;
  const marginRight = 20;
  const marginBottom = 60;

  // Get the right data point for each cell
  const getCellData = (api, hour) => {
    return heatmapData.find((d) => d.api === api && d.time === hour);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-white mr-2" />
                <h1 className="text-xl font-bold text-white">
                  API Performance Monitor
                </h1>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <div className="flex items-center text-xs text-white/80">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Updated: {refreshTime.toLocaleTimeString()}</span>
                </div>
                <button
                  className="bg-white/20 hover:bg-white/30 text-white text-sm py-1 px-3 rounded-md transition flex items-center"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-1 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  {isLoading ? "Refreshing..." : "Refresh"}
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white text-sm py-1 px-3 rounded-md transition flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
            <p className="text-sm text-white/80 mt-1">
              Monitoring API response times against SLA targets across
              environments
            </p>
          </div>

          {/* Filters and time range */}
          <div className="bg-slate-100 border-b border-slate-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-slate-500 mr-2" />
                <span className="text-sm font-medium text-slate-700">
                  Environment:
                </span>
                <select
                  className="ml-2 text-sm border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedEnvironment}
                  onChange={(e) => setSelectedEnvironment(e.target.value)}
                >
                  {environments.map((env) => (
                    <option key={env} value={env}>
                      {env}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <span className="text-sm font-medium text-slate-700">
                  Time Range:
                </span>
                <div className="ml-2 flex">
                  {["6h", "12h", "24h", "7d"].map((range) => (
                    <button
                      key={range}
                      className={`px-2 py-1 text-xs font-medium rounded-md ${
                        timeRange === range
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 md:mt-0 flex items-center">
              <span className="text-xs text-slate-500">
                Showing {filteredApis.length} of {mockApiData.apis.length} APIs
              </span>
            </div>
          </div>

          {/* API Status Cards */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {apiMetrics.map((api) => (
              <div
                key={api.name}
                className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3
                        className="text-sm font-medium text-slate-700 truncate"
                        title={api.name}
                      >
                        {api.name.length > 18
                          ? `${api.name.substring(0, 16)}...`
                          : api.name}
                      </h3>
                      <span
                        className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                          api.status === "critical"
                            ? "bg-red-100 text-red-800"
                            : api.status === "warning"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {api.environment}
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-2xl font-semibold">{api.average}</p>
                      <span className="ml-1 text-xs font-normal text-slate-500">
                        ms
                      </span>
                      <span className="ml-2 text-xs font-medium text-slate-600">
                        SLA: {api.sla}ms
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${getStatusColor(
                      api.status
                    )} h-3 w-3 rounded-full mt-1`}
                    title={`Status: ${api.status}`}
                  ></div>
                </div>
                <div className="mt-3">
                  <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full ${
                        api.slaCompliancePercent > 90
                          ? "bg-emerald-500"
                          : api.slaCompliancePercent > 75
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${api.slaCompliancePercent}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between items-center text-xs">
                    <span
                      className={`font-medium ${getStatusTextColor(
                        api.status
                      )}`}
                    >
                      {api.slaCompliancePercent}% SLA compliance
                    </span>
                    <span className="text-slate-500">Target: 99.5%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Chart - True Heatmap */}
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-slate-800">
                Response Time Heatmap
              </h2>
              <div className="text-xs text-slate-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Showing hourly data for the past 24 hours
              </div>
            </div>

            <div className="h-96 bg-white rounded-lg border border-slate-200 shadow-sm p-2 overflow-x-auto">
              <div
                className="h-full w-full relative"
                style={{
                  minWidth: marginLeft + hours.length * cellWidth + marginRight,
                  minHeight:
                    marginTop + apis.length * cellHeight + marginBottom,
                }}
              >
                {/* Y-Axis Labels (API Names) */}
                <div
                  className="absolute left-0 top-0 h-full"
                  style={{ width: marginLeft }}
                >
                  {apis.map((api, index) => (
                    <div
                      key={api}
                      className="absolute flex items-center text-xs text-slate-700 font-medium truncate pr-4"
                      style={{
                        top: marginTop + index * cellHeight + cellHeight / 2,
                        left: 0,
                        width: marginLeft - 10,
                        height: cellHeight,
                        transform: "translateY(-50%)",
                      }}
                    >
                      <span className="truncate">{api}</span>
                    </div>
                  ))}
                </div>

                {/* X-Axis Labels (Hours) */}
                <div
                  className="absolute left-0 bottom-0 w-full"
                  style={{ height: marginBottom }}
                >
                  {hours.map((hour, index) => (
                    <div
                      key={hour}
                      className="absolute flex justify-center text-xs text-slate-700"
                      style={{
                        left: marginLeft + index * cellWidth + cellWidth / 2,
                        bottom: marginBottom / 2,
                        width: cellWidth,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {hour}
                    </div>
                  ))}
                </div>

                {/* Grid Lines */}
                <div
                  className="absolute"
                  style={{
                    left: marginLeft,
                    top: marginTop,
                    width: hours.length * cellWidth,
                    height: apis.length * cellHeight,
                  }}
                >
                  {/* Horizontal Grid Lines */}
                  {apis.map((_, index) => (
                    <div
                      key={`hgrid-${index}`}
                      className="absolute left-0 w-full border-t border-slate-200"
                      style={{ top: index * cellHeight }}
                    ></div>
                  ))}
                  <div
                    className="absolute left-0 w-full border-t border-slate-200"
                    style={{ top: apis.length * cellHeight }}
                  ></div>

                  {/* Vertical Grid Lines */}
                  {hours.map((_, index) => (
                    <div
                      key={`vgrid-${index}`}
                      className="absolute top-0 h-full border-l border-slate-200"
                      style={{ left: index * cellWidth }}
                    ></div>
                  ))}
                  <div
                    className="absolute top-0 h-full border-l border-slate-200"
                    style={{ left: hours.length * cellWidth }}
                  ></div>
                </div>

                {/* Heatmap Cells */}
                <div
                  className="absolute"
                  style={{
                    left: marginLeft,
                    top: marginTop,
                    width: hours.length * cellWidth,
                    height: apis.length * cellHeight,
                  }}
                >
                  {apis.map((api, apiIndex) =>
                    hours.map((hour, hourIndex) => {
                      const cellData = getCellData(api, hour);
                      const { color } = getPerformanceLevel(
                        cellData.value,
                        cellData.sla
                      );
                      return (
                        <div
                          key={`${api}-${hour}`}
                          className="absolute flex items-center justify-center cursor-pointer transition-colors duration-150 hover:opacity-90"
                          style={{
                            left: hourIndex * cellWidth,
                            top: apiIndex * cellHeight,
                            width: cellWidth,
                            height: cellHeight,
                            backgroundColor: color,
                            border: cellData.withinSla
                              ? "none"
                              : "2px solid #f87171",
                          }}
                          title={`${api} at ${hour}: ${cellData.value}ms (SLA: ${cellData.sla}ms)`}
                        >
                          <span className="text-white text-xs font-medium">
                            {cellData.value}
                          </span>
                          {!cellData.withinSla && (
                            <span className="absolute bottom-1 text-white text-xxs opacity-80">
                              SLA ⚠
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Legend and help */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Performance Levels
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-emerald-500 mr-2"></div>
                    <span className="text-xs text-slate-700">
                      Excellent (&lt;80% of SLA)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-blue-500 mr-2"></div>
                    <span className="text-xs text-slate-700">
                      Good (80-100% of SLA)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-amber-500 mr-2"></div>
                    <span className="text-xs text-slate-700">
                      Warning (100-120% of SLA)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-red-500 mr-2"></div>
                    <span className="text-xs text-slate-700">
                      Critical (&gt;120% of SLA)
                    </span>
                  </div>
                  <div className="flex items-center col-span-2">
                    <div className="w-4 h-4 rounded bg-blue-500 mr-2 border-2 border-red-400"></div>
                    <span className="text-xs text-slate-700">
                      SLA Violation (red border)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">
                      Understanding API Performance
                    </h3>
                    <p className="text-xs text-blue-700 mt-1">
                      Each cell shows an API's response time at a specific hour.
                      Color indicates performance level relative to the SLA
                      target. Red borders highlight SLA violations. The
                      percentage bar shows overall SLA compliance over the time
                      period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapComponent;
