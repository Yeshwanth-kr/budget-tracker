import { Button, Modal, Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetsContext';
import React from 'react';
import { currencyFormatter } from '../utils';

const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
        useBudgets();

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
            : budgets.find((b) => b.id === budgetId);

    const expenses = getBudgetExpenses(budgetId);
    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap={2}>
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button
                                onClick={() => {
                                    deleteBudget(budgetId);
                                    handleClose();
                                }}
                                variant="outline-danger"
                            >
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vartical" gap={3}>
                    {expenses.map(({ id, description, amount }) => (
                        <Stack key={id} direction="horizontal" gap={2}>
                            <div className="me-auto fs-4">{description}</div>
                            <div className="fs-5">
                                {currencyFormatter.format(amount)}
                            </div>
                            <Button
                                onClick={() => deleteExpense(id)}
                                size="sm"
                                variant="outline-danger"
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpensesModal;
