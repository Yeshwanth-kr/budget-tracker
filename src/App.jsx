import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './context/BudgetsContext';

function App() {
    const { budgets, getBudgetExpenses } = useBudgets();
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

    const openAddExpenseModal = (budgetId) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    };

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Budgets</h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                        Add Budget
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={openAddExpenseModal}
                    >
                        Add Expense
                    </Button>
                </Stack>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1rem',
                        alignItems: 'flex-start',
                    }}
                >
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        );
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseModalClick={() =>
                                    openAddExpenseModal(budget.id)
                                }
                                onViewExpenseModalClick={() =>
                                    setViewExpenseModalBudgetId(budget.id)
                                }
                            />
                        );
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseModalClick={openAddExpenseModal}
                        onViewExpenseModalClick={() =>
                            setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                        }
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpenseModalBudgetId}
                handleClose={() => setViewExpenseModalBudgetId()}
            />
        </>
    );
}

export default App;
