

const sensors = [
    {
     "Sensor": "Iron 0505 Normal Speed",
     "Sensor Height (V)": 5120,
     "Sensor Width (H)": 5376,
     "Max Height (V)": 5120,
     "Max Width (H)": 5120,
     "Multiplexer CH": 16,
     "Multiplexer CH Total": 48,
     "Sensor Clock": 80000000,
     "min line duration": 124,
     "min exposure ticks": 636,
     "fps_line_duration_factor": 6,
     "fps_min_line_count": 2
    },
    {
     "Sensor": "Iron 0505 High Speed",
     "Sensor Height (V)": 5120,
     "Sensor Width (H)": 5376,
     "Max Height (V)": 5120,
     "Max Width (H)": 5120,
     "Multiplexer CH": 48,
     "Multiplexer CH Total": 48,
     "Sensor Clock": 96000000,
     "min line duration": 124,
     "min exposure ticks": 742,
     "fps_line_duration_factor": 7,
     "fps_min_line_count": 10
    },
    {
     "Sensor": "Iron 2505 Normal Speed",
     "Sensor Height (V)": 2160,
     "Sensor Width (H)": 2800,
     "Max Height (V)": 2160,
     "Max Width (H)": 2600,
     "Multiplexer CH": 10,
     "Multiplexer CH Total": 20,
     "Sensor Clock": 80000000,
     "min line duration": 152,
     "min exposure ticks": 119,
     "fps_line_duration_factor": 1,
     "fps_min_line_count": 6
    },
    {
     "Sensor": "Iron 2505 High Speed",
     "Sensor Height (V)": 2160,
     "Sensor Width (H)": 2800,
     "Max Height (V)": 2160,
     "Max Width (H)": 2600,
     "Multiplexer CH": 20,
     "Multiplexer CH Total": 20,
     "Sensor Clock": 96000000,
     "min line duration": 152,
     "min exposure ticks": 119,
     "fps_line_duration_factor": 1,
     "fps_min_line_count": 6
    },
    {
     "Sensor": "Iron 2509 Normal Speed",
     "Sensor Height (V)": 2160,
     "Sensor Width (H)": 4480,
     "Max Height (V)": 2160,
     "Max Width (H)": 4200,
     "Multiplexer CH": 16,
     "Multiplexer CH Total": 32,
     "Sensor Clock": 80000000,
     "min line duration": 152,
     "min exposure ticks": 119,
     "fps_line_duration_factor": 1,
     "fps_min_line_count": 6
    },
    {
     "Sensor": "Iron 2509 High Speed",
     "Sensor Height (V)": 2160,
     "Sensor Width (H)": 4480,
     "Max Height (V)": 2160,
     "Max Width (H)": 4200,
     "Multiplexer CH": 32,
     "Multiplexer CH Total": 32,
     "Sensor Clock": 96000000,
     "min line duration": 152,
     "min exposure ticks": 119,
     "fps_line_duration_factor": 1,
     "fps_min_line_count": 6
    },
    {
     "Sensor": "Iron 2518 Normal Speed",
     "Sensor Height (V)": 4096,
     "Sensor Width (H)": 4736,
     "Max Height (V)": 4096,
     "Max Width (H)": 4508,
     "Multiplexer CH": 16,
     "Multiplexer CH Total": 32,
     "Sensor Clock": 80000000,
     "min line duration": 152,
     "min exposure ticks": 636,
     "fps_line_duration_factor": 6,
     "fps_min_line_count": 8
    },
    {
     "Sensor": "Iron 2518 High Speed",
     "Sensor Height (V)": 4096,
     "Sensor Width (H)": 4736,
     "Max Height (V)": 4096,
     "Max Width (H)": 4508,
     "Multiplexer CH": 32,
     "Multiplexer CH Total": 32,
     "Sensor Clock": 96000000,
     "min line duration": 152,
     "min exposure ticks": 636,
     "fps_line_duration_factor": 6,
     "fps_min_line_count": 15
    }
   ]

   const interfacesBandwidth = {
    CXP3: 2.4,
    CXP6: 4.9,
    CXP12: 9.8
}
const interfaces = Object.keys(interfacesBandwidth)
