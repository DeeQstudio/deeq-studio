import type { MetadataRoute } from "next";
export default function manifest():MetadataRoute.Manifest{return {name:"DeeQ Studio",short_name:"DeeQ",description:"Web design and creative development from Bruges, Belgium.",start_url:"/",display:"standalone",background_color:"#080808",theme_color:"#080808",icons:[{src:"/media/icon-512.png",sizes:"512x512",type:"image/png"}]}}
