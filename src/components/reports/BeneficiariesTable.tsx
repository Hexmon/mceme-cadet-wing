import React from 'react';
import { Eye, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

interface Beneficiary {
  id: string;
  name: string;
  txnId: string;
  amount: number;
  mode: string;
  status: 'Success' | 'Processing' | 'Failed';
  time: string;
}

const mockBeneficiaries: Beneficiary[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    txnId: 'TXN123456789',
    amount: 5000,
    mode: 'IMPS',
    status: 'Success',
    time: '2 min ago'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    txnId: 'TXN123456789',
    amount: 5000,
    mode: 'IMPS',
    status: 'Processing',
    time: '2 min ago'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    txnId: 'TXN123456789',
    amount: 5000,
    mode: 'IMPS',
    status: 'Success',
    time: '2 min ago'
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    txnId: 'TXN123456789',
    amount: 5000,
    mode: 'IMPS',
    status: 'Success',
    time: '2 min ago'
  },
  {
    id: '5',
    name: 'Rajesh Kumar',
    txnId: 'TXN123456789',
    amount: 5000,
    mode: 'IMPS',
    status: 'Success',
    time: '2 min ago'
  }
];

interface BeneficiariesTableProps {
  semester?: string;
  printable?: boolean;
}

export const BeneficiariesTable: React.FC<BeneficiariesTableProps> = ({ semester, printable = false }) => {
  const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Success':
      return '!bg-green-100 !text-green-800';
    case 'Processing':
      return '!bg-yellow-100 !text-yellow-800';
    case 'Failed':
      return '!bg-red-100 !text-red-800';
    default:
      return '!bg-gray-100 !text-gray-800';
  }
};


  return (
    <Card className={`p-6 mb-8 ${printable ? 'shadow-none border-none' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Beneficiaries Reports{semester ? ` – ${semester}` : ''}
        </h3>
        {!printable && (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Beneficiaries</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Mode</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
              {!printable && (
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {mockBeneficiaries.map((beneficiary) => (
              <tr key={beneficiary.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium text-sm">
                        {beneficiary.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{beneficiary.name}</div>
                      <div className="text-sm text-muted-foreground">{beneficiary.txnId}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">₹{beneficiary.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{beneficiary.mode}</td>
                <td className="py-3 px-4">
                  <StatusBadge variant={getStatusVariant(beneficiary.status) as any}>
                    {beneficiary.status}
                  </StatusBadge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{beneficiary.time}</td>
                {!printable && (
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
