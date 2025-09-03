import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const PropertyCard = ({ property, onView }) => (
  <div className="property-card">
    {property.image && (
      <img
        src={property.image}
        alt={property.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />
    )}
    <h2>{property.name}</h2>
    <p>{property.type} - {property.location}</p>
    <p className="price">₹{property.price}</p>
    <p>{property.description}</p>
    <button className="view" onClick={() => onView(property)}>View</button>
  </div>
);


const AddPropertyForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    location: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(form);
    setForm({ name: "", type: "", price: "", location: "", description: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="property-card">
      <h2>Add Property</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" />
      <button type="submit" className="view">Submit</button>
    </form>
  );
};
const Modal = ({ property, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span
        style={{ float: "right", cursor: "pointer", fontWeight: "bold", fontSize: "18px" }}
        onClick={onClose}
      >
        ✖
      </span>
      <h2>{property.name}</h2>
      <p><b>Type:</b> {property.type}</p>
      <p><b>Location:</b> {property.location}</p>
      <p><b>Price:</b> ₹{property.price}</p>
      <p><b>Description:</b> {property.description}</p>

      {property.image && (
        <img
          src={property.image}
          alt={property.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "8px",
            margin: "10px 0"
          }}
        />
      )}

   
      {property.lat && property.lng && (
        <iframe
          title="map"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "8px", marginTop: "10px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCT50GZn4d73WGeC0xerwrHeLSVndC2Y5U&center=${property.lat},${property.lng}&zoom=15`}
        ></iframe>
      )}
    </div>
  </div>
);


const App = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await axios.get("http://localhost:5000/properties");
    setProperties(res.data);
  };

  const addProperty = async (property) => {
    await axios.post("http://localhost:5000/properties", property);
    fetchProperties();
  };

  const filtered = properties.filter((p) =>
    (filter ? p.type === filter : true) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container">
      <h1>Mini Property Listing Dashboard</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Retail Store">Retail Store</option>
        </select>
      </div>

      <AddPropertyForm onAdd={addProperty} />

      <div className="property-list">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} onView={setSelected} />
        ))}
      </div>

      {selected && <Modal property={selected} onClose={() => setSelected(null)} />}

    </div>
  );
};

export default App;
