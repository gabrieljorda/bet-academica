import React, { useState, useEffect } from 'react';

const EventForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    timeA: '',
    timeB: '',
    esporte: 'Futebol',
    data: '',
    oddA: 1.5,
    oddB: 1.5,
    status: 'aberto'
  });

  useEffect(() => {
    if (event) {
      setFormData({
        timeA: event.timeA,
        timeB: event.timeB,
        esporte: event.esporte,
        data: event.data.split('T')[0],
        oddA: event.oddA,
        oddB: event.oddB,
        status: event.status
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const esportes = ['Futebol', 'Basquete', 'Vôlei', 'E-sports', 'Tênis', 'MMA'];

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        {event ? 'Editar Evento' : 'Novo Evento'}
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time A
            </label>
            <input
              type="text"
              name="timeA"
              value={formData.timeA}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="Ex: Brasil"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time B
            </label>
            <input
              type="text"
              name="timeB"
              value={formData.timeB}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="Ex: Argentina"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Esporte
            </label>
            <select
              name="esporte"
              value={formData.esporte}
              onChange={handleChange}
              className="input-field"
              required
            >
              {esportes.map(esporte => (
                <option key={esporte} value={esporte}>{esporte}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Odd Time A
            </label>
            <input
              type="number"
              name="oddA"
              value={formData.oddA}
              onChange={handleChange}
              className="input-field"
              step="0.1"
              min="1.0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Odd Time B
            </label>
            <input
              type="number"
              name="oddB"
              value={formData.oddB}
              onChange={handleChange}
              className="input-field"
              step="0.1"
              min="1.0"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
          >
            {event ? 'Atualizar' : 'Criar'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;