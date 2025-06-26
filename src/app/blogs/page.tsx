// "use client";
// import { useState, useEffect } from "react";
// // import { Experience } from "@/cores/types/experience";
// import { ExperienceService } from "@/services/experience";
// // import { Blogs } from "@/cores/types/project";
// // import { Blogservice } from "@/services/project";
// import Header from "@/components/common/header";
// import { Footer } from "@/components/common/footer";
// import BlogsCard from "@/components/card/project";

// const Blogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   //   const [projects, setBlogss] = useState<Blogs[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // const [dataBlogs, dataBlogss] = await Blogservice.fetchBlogss();
//         // setBlogs(dataBlogs);
//       } catch (error) {
//         console.error("Error fetching page data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <main className="bg-gray-900 text-white w-full overflow-x-hidden">
//       {/* <Header /> */}
//       <div className="container mx-auto px-6 max-w-7xl">
//         {/* === FEATURED BLOGS SECTION === */}
//         <section id="BLOGS" className="py-20 md:py-28">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">Featured Blogss</h2>
//             <p className="text-gray-400 mt-2 text-lg">A selection of my proudest work.</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{loading ? Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[420px] bg-gray-800/50 rounded-lg animate-pulse"></div>) : blogs.map((blog) => <BlogsCard key={blog.id} {...blog} />)}</div>
//         </section>
//       </div>
//       <Footer />
//     </main>
//   );
// };

// export default Blogs;
