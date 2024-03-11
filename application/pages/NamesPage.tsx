"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Name } from "@prisma/client";

const NamesPage = () => {
  const [allNames, setAllNames] = useState<Name[]>([]);
  const [name, setName] = useState("");

  const handleDeleteName = async (id: number) => {
    try {
      const response = await fetch(`/api/names`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error deleting name: ${response.statusText}`);
      }

      // Update state regardless of response body
      setAllNames(allNames.filter((name) => name.id !== id));
    } catch (error) {
      console.error("Error deleting name:", error);
    }
  };

  const handleAddName = async () => {
    try {
      const response = await fetch("/api/names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`Error adding name: ${response.statusText}`);
      }

      const newName = await response.json();
      await fetchNames();

      // Optionally, update UI with the new name list if needed
    } catch (error) {
      console.error("Error adding name:", error);
    } finally {
      setName(""); // Clear input field after submission
    }
  };

  const fetchNames = async () => {
    try {
      const response = await fetch("/api/names"); // Use built-in fetch API

      if (!response.ok) {
        throw new Error(`Error fetching names: ${response.statusText}`);
      }

      const names = await response.json();
      setAllNames(names);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []); // Fetch names on initial page load

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-slate-900  m-auto text-white "
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute hidden transform -translate-x-1/2 -translate-y-1/2 rounded-full md:block custom-glass size-36 "
        style={{ top: cursorPosition.y, left: cursorPosition.x }}
      ></div>
      <div className=" bg-white/20 hover:bg-white/30 p-8 rounded  w-full max-w-md z-10 shadow-2xl ">
        <Head>
          <title>Names List</title>
        </Head>
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800s">
          Names
        </h2>
        <div className="mt-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800 caret-red-500"
          />
          <button
            disabled={!name.trim()}
            onClick={handleAddName}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition-all disabled:bg-stone-500 disabled:text-gray-400"
          >
            Add Name
          </button>
        </div>
        <ul className="mt-6  ">
          {allNames.map((name: Name) => (
            <li
              key={name.id}
              className=" border-gray-300 py-3 flex items-center justify-between hover:bg-white/50 p-2 hover:text-green-300 rounded-md transition-all delay-50 duration-500"
            >
              <span className="text-lg ">{name.name}</span>
              <button
                onClick={() => handleDeleteName(name.id)}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none transition-all"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NamesPage;
