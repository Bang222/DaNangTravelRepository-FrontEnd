import Navbar from "@/components/Navbar";
import React from "react";
export default function Home () {
   return (
      <main>
          <title>Home pages</title>
          <section>
                <Navbar/>
              <div className="mt-3 text-center">
                  <h1 className="text-[3rem]">Welcome to Blogs Of Bang danh :v</h1>
                  <p>Tour</p>
              </div>
              <div
                  className={
                      'max-w-screen flex flex-col justify-center item-center text-[1.15rem] mt-12'
                  }
              >
              </div>
          </section>
      </main>
  )
}
