import React, { useState, useEffect } from 'react';
import './style.css';
import Searchbox from './components/Searchbox';
export default function App() {
  const [colors, setColor] = useState([]);
  const [searchColor, setSearchColor] = useState('');
  const [google_colors, setGoogleColor] = useState([]);
  const handleChange = (e) => {
    const val = e.target.value;
    if (val && val.length > 0) {
      setSearchColor(val);
    }
  };
  const findColor = (color) => {
    return color;
  };

  const fetchAll = async () => {};
  const fetchColors = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $regex: searchColor,
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Color?limit=10&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'vei5uu7QWv5PsN3vS33pfc7MPeOPeZkrOcP24yNX', // This is the fake app's application id
          'X-Parse-Master-Key': 'aImLE6lX86EFpea2nDjq9123qJnG0hxke416U7Je', // This is the fake app's readonly master key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need

    setColor(data.results);
  };

  const fetchGoogleImageColors = async () => {
    let response = await fetch(
      `https://serpapi.com/search?q=${searchColor} color&tbm=isch&ijn=0&api_key=723871894036fe1fa8abda232407d418ef39f9ba223d751390fff2dff2bd3967`
    );
    let data = await response.json(); // Here you have the data that you need
    setGoogleColor(data['images_results']);
  };

  useEffect(() => {
    fetchColors();
    fetchGoogleImageColors();
  }, [searchColor]);
  return (
    <div>
      {searchColor}
      <Searchbox onChange={handleChange} value={searchColor} />
      {/* <div className="searchbox">
        <div>
          <h3>Search any word(demo : almon)</h3>
          <input
            type="text"
            placeholder="enter the word"
            onChange={handleChange}
            value={searchColor}
          />
        </div>
      </div> */}
      <div>
        <div>
          <h1 className="text-gradient">Color gradient grid</h1>
          <div>
            {colors.length > 0 ? (
              <>
                {!colors ? (
                  <div>Loading...</div>
                ) : (
                  <div className="grid">
                    {colors &&
                      colors.map((item) => {
                        return (
                          <div
                            className="grid_item"
                            style={{
                              backgroundColor: `${item.hexCode}`,
                            }}
                          >
                            <div>{item.name}</div>
                            <div>{item.hexCode}</div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </>
            ) : (
              <div>Results not found</div>
            )}
          </div>
          <h1 className="text-gradient">Related color lists.</h1>
          <div>
            <div>
              {google_colors && google_colors.length > 0 ? (
                <>
                  {!google_colors ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="grid">
                      {google_colors &&
                        google_colors.map((item) => {
                          return (
                            <div
                              className="grid_item"
                              style={{
                                backgroundColor: `${item.hexCode}`,
                              }}
                            >
                              <img src={item.thumbnail} />
                            </div>
                          );
                        })}
                    </div>
                  )}
                </>
              ) : (
                <div>Results not found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
