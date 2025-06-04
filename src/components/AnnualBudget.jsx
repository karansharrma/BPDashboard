import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Edit3,
  Trash2,
  Truck,
  Wrench,
  ShoppingCart,
  Fuel,
  DollarSign,
} from "lucide-react";

const AnnualBudget = () => {
  const [budgetItems, setBudgetItems] = useState([
    {
      id: 1,
      category: "Repairs & Maintenance",
      allocated: 15000,
      spent: 8500,
      description: "Engine repairs, brake maintenance, tire replacements",
    },
    {
      id: 2,
      category: "New Vehicle Purchase",
      allocated: 45000,
      spent: 0,
      description: "Down payment for new delivery truck",
    },
    {
      id: 3,
      category: "Fuel & Operating",
      allocated: 18000,
      spent: 12300,
      description: "Diesel fuel, oil changes, routine maintenance",
    },
    {
      id: 4,
      category: "Insurance & Registration",
      allocated: 8000,
      spent: 7800,
      description: "Commercial vehicle insurance and registration fees",
    },
    {
      id: 5,
      category: "Parts & Accessories",
      allocated: 5000,
      spent: 2100,
      description: "Spare parts inventory, tools, accessories",
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    category: "",
    allocated: "",
    spent: "",
    description: "",
  });

  const totalAllocated = budgetItems.reduce(
    (sum, item) => sum + item.allocated,
    0
  );
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;

  const getCategoryIcon = (category) => {
    if (
      category.toLowerCase().includes("repair") ||
      category.toLowerCase().includes("maintenance")
    ) {
      return <Wrench className="w-5 h-5 text-orange-400" />;
    } else if (
      category.toLowerCase().includes("purchase") ||
      category.toLowerCase().includes("vehicle")
    ) {
      return <Truck className="w-5 h-5 text-blue-400" />;
    } else if (
      category.toLowerCase().includes("fuel") ||
      category.toLowerCase().includes("operating")
    ) {
      return <Fuel className="w-5 h-5 text-yellow-400" />;
    } else {
      return <ShoppingCart className="w-5 h-5 text-green-400" />;
    }
  };

  const getUtilizationColor = (spent, allocated) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleAddItem = () => {
    if (newItem.category && newItem.allocated) {
      const item = {
        id: Date.now(),
        category: newItem.category,
        allocated: parseFloat(newItem.allocated) || 0,
        spent: parseFloat(newItem.spent) || 0,
        description: newItem.description,
      };
      setBudgetItems([...budgetItems, item]);
      setNewItem({ category: "", allocated: "", spent: "", description: "" });
      setShowAddForm(false);
    }
  };

  const handleUpdateItem = (id, field, value) => {
    setBudgetItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "allocated" || field === "spent"
                  ? parseFloat(value) || 0
                  : value,
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setBudgetItems((items) => items.filter((item) => item.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="max-w-6xl mx-auto p-6 min-h-screen"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 mb-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">
              Annual Truck Budget 2025
            </h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Add Budget Item
          </button>
        </div>

        {/* Budget Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-medium text-blue-300">
                Total Allocated
              </h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalAllocated)}
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-medium text-red-300">Total Spent</h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalSpent)}
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-medium text-green-300">Remaining</h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(remainingBudget)}
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-medium text-purple-300">
                Utilization
              </h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {((totalSpent / totalAllocated) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Add New Item Form */}
        {showAddForm && (
          <div className="bg-gray-700 p-4 rounded-lg mb-6 border border-gray-600 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add New Budget Item
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category (e.g., Repairs & Maintenance)"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="p-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Allocated Amount"
                value={newItem.allocated}
                onChange={(e) =>
                  setNewItem({ ...newItem, allocated: e.target.value })
                }
                className="p-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Amount Spent (optional)"
                value={newItem.spent}
                onChange={(e) =>
                  setNewItem({ ...newItem, spent: e.target.value })
                }
                className="p-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="p-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddItem}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors shadow-lg"
              >
                Add Item
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Budget Items */}
        <div className="space-y-4">
          {budgetItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-gray-700 rounded-lg border border-gray-600">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="flex-1">
                    {isEditing === item.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) =>
                            handleUpdateItem(
                              item.id,
                              "category",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleUpdateItem(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.category}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Allocated
                        </label>
                        {isEditing === item.id ? (
                          <input
                            type="number"
                            value={item.allocated}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.id,
                                "allocated",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-white">
                            {formatCurrency(item.allocated)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Spent
                        </label>
                        {isEditing === item.id ? (
                          <input
                            type="number"
                            value={item.spent}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "spent", e.target.value)
                            }
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-white">
                            {formatCurrency(item.spent)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Remaining
                        </label>
                        <p className="text-lg font-semibold text-white">
                          {formatCurrency(item.allocated - item.spent)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Budget Utilization</span>
                        <span>
                          {((item.spent / item.allocated) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 border border-gray-600">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getUtilizationColor(
                            item.spent,
                            item.allocated
                          )}`}
                          style={{
                            width: `${Math.min(
                              (item.spent / item.allocated) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {isEditing === item.id ? (
                    <button
                      onClick={() => setIsEditing(null)}
                      className="p-2 text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(item.id)}
                      className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnualBudget;
