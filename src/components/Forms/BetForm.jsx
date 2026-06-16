import React, { useState } from 'react';
import { useBetting } from '../../contexts/BettingContext';

const BetForm = ({ event, userSaldo, onClose }) => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { placeBet } = useBetting();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const betAmount = parseFloat(amount);
    
    if (!selectedTeam) {
      setError('Selecione um time');
      return;
    }
    
    if (isNaN(betAmount) || betAmount <= 0) {
      setError('Valor da aposta inválido');
      return;
    }
    
    if (betAmount > userSaldo) {
      setError('Saldo insuficiente');
      return;
    }

    setLoading(true);
    const result = await placeBet(event.id, selectedTeam, betAmount);
    setLoading(false);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  const getOdd = () => {
    return selectedTeam === event.timeA ? event.oddA : 
           selectedTeam === event.timeB ? event.oddB : 0;
  };

  const potentialReturn = amount && selectedTeam ? 
    (parseFloat(amount) * getOdd()).toFixed(2) : 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Realizar Aposta</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="font-semibold">{event.timeA} vs {event.timeB}</p>
        <p className="text-sm text-gray-600">Saldo disponível: R$ {userSaldo.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o vencedor
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedTeam(event.timeA)}
              className={`p-3 border rounded-lg transition-colors ${
                selectedTeam === event.timeA
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <p className="font-medium">{event.timeA}</p>
              <p className="text-sm text-gray-600">Odd {event.oddA}</p>
            </button>
            
            <button
              type="button"
              onClick={() => setSelectedTeam(event.timeB)}
              className={`p-3 border rounded-lg transition-colors ${
                selectedTeam === event.timeB
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <p className="font-medium">{event.timeB}</p>
              <p className="text-sm text-gray-600">Odd {event.oddB}</p>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor da Aposta (R$)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            placeholder="Digite o valor"
            min="1"
            max={userSaldo}
            step="1"
            required
          />
        </div>

        {selectedTeam && amount && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">Retorno potencial: R$ {potentialReturn}</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Confirmar Aposta'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BetForm;