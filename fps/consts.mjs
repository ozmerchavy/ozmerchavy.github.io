const sensors = [
    {
        "Sensor": "Iron 0505",
        "Normal Speed": {
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
            "fps_min_line_count": 2,
            "type": "x5xx"

        },


        "High Speed": {
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
            "fps_min_line_count": 10,
            "type": "x5xx"
        }
    },
    {
        "Sensor": "Iron 2505",
        "Normal Speed": {
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
            "fps_min_line_count": 6,
            "type": "x5xx"
        },
        "High Speed": {
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
            "fps_min_line_count": 6,
            "type": "x5xx"
        }
    },
    {
        "Sensor": "Iron 2509",
        "Normal Speed": {
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
            "fps_min_line_count": 6,
            "type": "x5xx"
        },
        "High Speed": {
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
            "fps_min_line_count": 6,
            "type": "x5xx"
        }
    },
    {
        "Sensor": "Iron 2518",
        "Normal Speed": {
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
            "fps_min_line_count": 8,
            "type": "x5xx"
        },
        "High Speed": {
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
            "fps_min_line_count": 15,
            "type": "x5xx"
        }
    }, {
        "Sensor": "Iron 4521",
        "Normal Speed": {
            "Sensor Height (V)": 4128,
            "Sensor Width (H)": 5376,
            "Max Height (V)": 4096,
            "Max Width (H)": 5120,
            "Sensor Clock": 1200000000,
            "8bit min line time": 71,
            "10bit min line time": 114,
            "12bit min line time": 193,
            "Total used MUX": 40,
            "FOT in lines": 16,
            "type": "45xx"
        },
        "Binning2x2": {
            "Sensor Height (V)": 2064,
            "Sensor Width (H)": 2688,
            "Max Height (V)": 2048,
            "Max Width (H)": 2560,
            "Sensor Clock": 1200000000,
            "8bit min line time": null,
            "10bit min line time": null,
            "12bit min line time": null,
            "Total used MUX": 40,
            "FOT in lines": 16,
            "type": "45xx"
        }
    }, {
        "Sensor": "Iron 4510",
        "Normal Speed": {
            "Sensor Height (V)": 2240,
            "Sensor Width (H)": 4864,
            "Max Height (V)": 2176,
            "Max Width (H)": 4608,
            "Sensor Clock": 1200000000,
            "8bit min line time": 65,
            "10bit min line time": 106,
            "12bit min line time": 187,
            "Total used MUX": 40,
            "FOT in lines": 16,
            "type": "45xx"
        },
        "Binning2x2": {

            "Sensor Height (V)": 1120,
            "Sensor Width (H)": 2432,
            "Max Height (V)": 1088,
            "Max Width (H)": 2304,
            "Sensor Clock": 1200000000,
            "8bit min line time": null,
            "10bit min line time": null,
            "12bit min line time": null,
            "Total used MUX": 40,
            "FOT in lines": 16,
            "type": "45xx"
        }
    }, {
        "Sensor": "Iron 4502",
        "Normal Speed": {
            "Sensor Height (V)": 1280,
            "Sensor Width (H)": 2304,
            "Max Height (V)": 1216,
            "Max Width (H)": 2048,
            "Sensor Clock": 1200000000,
            "8bit min line time": 68,
            "10bit min line time": 106,
            "12bit min line time": 187,
            "Total used MUX": 40,
            "FOT in lines": 16,
            "type": "45xx"
        },
        "Binning2x2": {
            "Sensor Height (V)": 640,
            "Sensor Width (H)": 1152,
            "Max Height (V)": 608,
            "Max Width (H)": 1024,
            "Sensor Clock": 1200000000,
            "8bit min line time": null,
            "10bit min line time": null,
            "12bit min line time": null,
            "Total used MUX": 40,
            "FOT in lines": 16,
            "type": "45xx"
        }
    }, {
        "Sensor": "Iron 250",

        "All Pixels": {
            "type": "25x",
            "Max Width (H)": "2448",
            "Max Height (V)": "2048",
            "VMAX (datasheet)": "82e",
            "HSYNC 8bit datasheet": "0D9",
            "HSYNC 10bit datasheet": "0F5",
            "HSYNC 12bit datasheet": "18C",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1,
            "Sample clock (Mhz)": 74.25


        },
        "1/2 Subsampling": {
            "type": "25x",
            "Max Width (H)": "1220",
            "Max Height (V)": "1024",
            "VMAX (datasheet)": "42a",
            "HSYNC 8bit datasheet": "0da",
            "HSYNC 10bit datasheet": "104",
            "HSYNC 12bit datasheet": "18c",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1,
            "Sample clock (Mhz)": 74.25
        },
        "Vertical 2pxl FD Binning": {
            "type": "25x",
            "Max Width (H)": "2448",
            "Max Height (V)": "1024",
            "VMAX (datasheet)": "42a",
            "HSYNC 8bit datasheet": "0d9",
            "HSYNC 10bit datasheet": "0f5",
            "HSYNC 12bit datasheet": "18c",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        }
    }, {
        "Sensor": "Iron 252",
        "All Pixels": {
            "type": "25x",
            "Max Width (H)": "2048",
            "Max Height (V)": "1536",
            "VMAX (datasheet)": "62e",
            "HSYNC 8bit datasheet": "0D9",
            "HSYNC 10bit datasheet": "0F5",
            "HSYNC 12bit datasheet": "18C",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },
        "1/2 Subsampling": {
            "type": "25x",
            "Max Width (H)": "1024",
            "Max Height (V)": "768",
            "VMAX (datasheet)": "32A",
            "HSYNC 8bit datasheet": "0d9",
            "HSYNC 10bit datasheet": "0f5",
            "HSYNC 12bit datasheet": "18c",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },
        "Vertical 2pxl FD Binning": {
            "type": "25x",
            "Max Width (H)": "2048",
            "Max Height (V)": "768",
            "VMAX (datasheet)": "32a",
            "HSYNC 8bit datasheet": "0d9",
            "HSYNC 10bit datasheet": "0f5",
            "HSYNC 12bit datasheet": "18c",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        }
    }, {
        "Sensor": "Iron 253",
        
        "All Pixels": {
            "type": "25x",
            "Max Width (H)": "4096",
            "Max Height (V)": "3000",
            "VMAX (datasheet)": "bf6",
            "HSYNC 8bit datasheet": "163",
            "HSYNC 10bit datasheet": "177",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },
        "1/2 Subsampling": {
            "type": "25x",
            "Max Width (H)": "2048",
            "Max Height (V)": "1500",
            "VMAX (datasheet)": "616",
            "HSYNC 8bit datasheet": "163",
            "HSYNC 10bit datasheet": "177",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        }
    }, {
        "Sensor": "Iron 255",
        "All Pixels": {
            "type": "25x",
            "Max Width (H)": "4096",
            "Max Height (V)": "2160",
            "VMAX (datasheet)": "8b6",
            "HSYNC 8bit datasheet": "163",
            "HSYNC 10bit datasheet": "177",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },

        "1/2 Subsampling": {
            "type": "25x",
            "Max Width (H)": "2048",
            "Max Height (V)": "1080",
            "VMAX (datasheet)": "476",
            "HSYNC 8bit datasheet": "164",
            "HSYNC 10bit datasheet": "177",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },
        "Vertical 2pxl FD Binning": {
            "type": "25x",
            "Max Width (H)": "4096",
            "Max Height (V)": "1080",
            "VMAX (datasheet)": "476",
            "HSYNC 8bit datasheet": "164",
            "HSYNC 10bit datasheet": "177",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },

        "2x2 vertical FD Binning": {
            "type": "25x",
            "Max Width (H)": "2048",
            "Max Height (V)": "1080",
            "VMAX (datasheet)": "476",
            "HSYNC 8bit datasheet": "164",
            "HSYNC 10bit datasheet": "177",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        }
    }, {
        "Sensor": "Iron 305",
        "All Pixels": {
            "type": "25x",
            "Max Width (H)": "4096",
            "Max Height (V)": "2160",
            "VMAX (datasheet)": "8b6",
            "HSYNC 8bit datasheet": "none",
            "HSYNC 10bit datasheet": "none",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        },

        "1/2 Subsampling": {
            "type": "25x",
            "Max Width (H)": "2048",
            "Max Height (V)": "1080",
            "VMAX (datasheet)": "NONE",
            "HSYNC 8bit datasheet": "NONE",
            "HSYNC 10bit datasheet": "NONE",
            "HSYNC 12bit datasheet": "20a",
            "Sensor clock MHz": 74.25,
            "Number of ticks for generating 2MHz clock": 1, 
            "Sample clock (Mhz)": 74.25
        }
    }


]

const interfacesBandwidth = {
    CXP12: 9.8,
    CXP6: 4.9,
    CXP3: 2.4,

}
const interfaces = Object.keys(interfacesBandwidth)
