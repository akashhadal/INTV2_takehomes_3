import React,{useState,useEffect} from "react";

export default function xLogin() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
          />
        </div>
      </form>
    </div>
  );
}

